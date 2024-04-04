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

    async getItems(req, res) {
        try {
            const products = await Product.find({
                user_id: req.user.id,
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
                                    amount:
                                        product.price * 100,
                                    currency: seller.currency,
                                },
                                note: `Order for ${product.name}`,
                            },
                        ],
                    },
                });

                console.log(order.data);
                const order_id = order.data.order.id;

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

                console.log(charge.data);
            } catch (error) {
                console.log(error.response.data);
                throw new Error(error);
            }

            product.quantity--;
            await product.save();

            const trans = Transaction.create({
                info: "",
                customer: customer._id,
                user: seller._id,
                item: product._id,
                amount: product.price * Number(quantity),
                type: "PAID",
            });

            sendResponse(res, 200, true, "Product purchased successfully!", trans);
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }
}

module.exports = new Controller();
