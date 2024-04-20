/** @format */

const {
    sendResponse,
    badResponse,
    successResponse,
    errorResponse,
} = require("../helpers/response");
const { genHash, compareHash, genAccessToken } = require("../helpers");
const Customer = require("../models/customers.model");
const Product = require("../models/products.model");
const User = require("../models/users.model");
const square = require("../services/square");
const { randomUUID } = require("crypto");
const Transaction = require("../models/transactions.model");
const { LID } = process.env;
const event = require("../helpers/event");
const { getIo } = require("../services/socket-transactions");

class Controller {
    async addItem(req, res) {
        let { body, user } = req;

        try {
            body.user_id = user._id;
            const product = await Product.create(body);

            sendResponse(
                res,
                200,
                true,
                "Product created successfully",
                product
            );
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async getItem(req, res) {
        try {
            const itemId = req.params.productId;

            const item = await Product.findOne({
                _id: itemId,
            });

            if (!item) {
                return sendResponse(res, 400, false, "Item not found!");
            }

            sendResponse(res, 200, true, "Fetched item successfully", item);
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async deleteItem(req, res) {
        try {
            const itemId = req.params.productId;

            const item = await Product.findOne({
                _id: itemId,
            });

            if (!item) {
                return sendResponse(res, 400, false, "Item not found!");
            }

            await item.deleteOne();

            sendResponse(res, 200, true, "Item deleted successfully", item);
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async updateItem(req, res) {
        try {
            const itemId = req.params.productId;

            const item = await Product.findOne({
                _id: itemId,
            });

            if (!item) {
                return sendResponse(res, 400, false, "Item not found!");
            }

            item.name = req.body.name || item.name;
            item.price = req.body.price || item.price;
            item.quantity = req.body.quantity || item.quantity;
            item.info = req.body.info || item.info;
            item.images = req.body.images || item.images;
            await item.save();

            sendResponse(res, 200, true, "Item updated successfully");
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async getItems(req, res) {
        try {
            const products = await Product.find({
                user_id: req.user._id,
            });

            sendResponse(res, 200, true, products);
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async buyItem(req, res) {
        try {
            const { productId } = req.params;
            const quantity = (req.body.quantity || "1") + "";
            const tiktok_user = req.body.user;

            const product = await Product.findOne({
                _id: productId,
            });

            if (product.quantity <= 0) {
                return errorResponse(res, `Out of Stock!`);
            }

            if (product.quantity < Number(quantity)) {
                return errorResponse(
                    res,
                    `Product remaining ${product.quantity}!`
                );
            }

            if (!product) {
                return errorResponse(res, "Product not found!");
            }

            const seller = await User.findById(product.user_id);

            if (!seller) {
                return errorResponse(res, "Seller not found!");
            }

            const customer = await Customer.findById(req.user._id);

            if (!customer) {
                return errorResponse(res, "Customer not found!");
            }

            if (!customer.card_token) {
                return errorResponse(res, "Add a Credit Card!");
            }

            let order_id, payment_id;

            try {
                const ref = randomUUID();
                const order = await square.post("/orders", {
                    idempotency_key: randomUUID(),
                    order: {
                        reference_id: ref,
                        location_id: LID,
                        customer_id: customer.customer_id,
                        line_items: [
                            {
                                name: product.name,
                                quantity,
                                base_price_money: {
                                    amount: product.price * 100,
                                    currency: seller.currency,
                                },
                                note: `Order for ${product.name}`,
                            },
                        ],
                    },
                });

                // console.log(order.data);
                order_id = order.data.order.id;

                const charge = await square.post("/payments", {
                    idempotency_key: randomUUID(),
                    source_id: customer.card.id,
                    order_id,
                    amount_money: {
                        amount: product.price * Number(quantity) * 100,
                        currency: seller.currency,
                    },
                    customer_details: {
                        seller_keyed_in: true,
                    },
                    buyer_email_address: customer.email,
                    customer_id: customer.customer_id,
                    reference_id: ref,
                    // verification_token: customer.card.verification_token,
                });

                payment_id = charge.data.payment.id;

                // console.log(charge.data);
            } catch (error) {
                console.log(error.response.data);
                throw new Error(error);
            }

            product.quantity--;
            await product.save();

            const trans = await Transaction.create({
                info: "",
                customer: customer._id,
                user: seller._id,
                item: product._id,
                amount: product.price * Number(quantity),
                type: "PAID",
                payment_id,
                order_id,
            });

            await trans.populate({
                path: "item",
                select: {
                    name: 1,
                    images: { $slice: ["$images", 1] },
                },
            });
            await trans.populate({
                path: "customer",
                select: {
                    name: 1,
                    username: 1,
                    picture: 1,
                },
            });

            const data = {
                customer: {
                    name: tiktok_user?.name || trans.customer.name,
                    picture: tiktok_user?.picture || trans.customer.picture,
                    username: tiktok_user?.username,
                },
                item: {
                    name: trans.item.name,
                    picture: trans.item.images[0] || "",
                },
                amount: product.price,
                quantity,
            };

            // event.emit(`sold-${seller._id.toString()}`, data);

            const io = getIo();
            io.emit(`sold-${seller._id.toString()}`, {
                message: "Your purchase is completed!",
                transaction: trans,
                data,
            });

            sendResponse(
                res,
                200,
                true,
                "Product purchased successfully!",
                trans
            );
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async refundItem(req, res) {
        try {
            const { id, reason } = req.body;
            const tran = await Transaction.findOne({
                _id: id,
                type: "PAID",
            })
                .populate({
                    path: "customer",
                    select: "customer_id card_token",
                })
                .populate({
                    path: "user",
                    select: "currency",
                })
                .populate({
                    path: "item",
                    select: "quantity",
                });

            if (!tran) {
                return errorResponse(res, "Transaction not found!");
            }

            // console.log(tran.item);

            const refund = await square.post("/refunds", {
                idempotency_key: randomUUID(),
                payment_id: tran.payment_id,
                amount_money: {
                    amount: tran.amount * 100,
                    currency: tran.user.currency,
                },
                // destination_id: tran.customer.card_token,
                // customer_id: tran.customer.customer_id,
                // location_id: LID,
                unlinked: false,
                reason: `Refund for ${reason ? reason : "Unknown reason"}`,
            });

            // console.log(refund.data);

            await tran.updateOne({
                type: "REFUND",
            });

            await Product.findOneAndUpdate(
                {
                    _id: tran.item._id,
                },
                {
                    quantity: tran.item.quantity + 1,
                }
            );

            sendResponse(res, 200, true, "Transaction refunded successfully!");
        } catch (error) {
            console.log(error.response.data);
            errorResponse(res);
        }
    }

    async getActiveItem(req, res) {
        try {
            const user = await User.findOne({
                _id: req.user._id,
            });

            if (!user) {
                return errorResponse(res, "User not found!");
            }

            const activeItem = await Product.findOne({
                _id: user.activeItem,
            });

            let item = {};

            if (activeItem) {
                item = {
                    images: activeItem.images,
                    info: {
                        _id: activeItem._id.toString(),
                        info: activeItem.info,
                        price: activeItem.price,
                        name: activeItem.name,
                        quantity: activeItem.quantity,
                    },
                };
            }

            return successResponse(
                res,
                "Fetched Active Item Successfully!",
                item
            );
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async setActiveItem(req, res) {
        try {
            const itemId = req.params.productId;

            const item = await Product.findOne({
                _id: itemId,
                user_id: req.user._id,
            });

            if (!item) {
                return sendResponse(res, 400, false, "Item not found!");
            }

            await User.findByIdAndUpdate(req.user._id, {
                activeItem: itemId,
            });

            const io = getIo();
            io.emit(`item-${req.user.tiktok}`, {
                message: "Active Item Changed",
            });

            sendResponse(
                res,
                200,
                true,
                "Updated active item successfully",
                item
            );
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async watchForPurchase(req, res) {
        const emitter = event;

        const populateDocument = async (insertedDocument) => {
            console.log({ insertedDocument });
            const populatedDocument = {
                ...insertedDocument,
            };
            return populatedDocument;
        };

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const listener = (data) => {
            console.log({ data });
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        };

        // Listen for insert events and send data to client
        emitter.on(`sold-${req.user._id}`, listener);

        // Handle client disconnect
        req.on("close", () => {
            emitter.off(`sold-${req.user._id}`, listener);
        });
    }
}

module.exports = new Controller();
