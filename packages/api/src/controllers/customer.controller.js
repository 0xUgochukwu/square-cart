const {
    sendResponse,
    badResponse,
    successResponse,
    errorResponse,
} = require("../helpers/response");
const { genHash, compareHash, genAccessToken } = require("../helpers");
const Customer = require("../models/customers.model");
const User = require("../models/users.model");
const Product = require("../models/products.model");
const square = require("../services/square");
const { randomUUID } = require("crypto");
const Transaction = require("../models/customer.model");

class Controller {
    async checkEmail(req, res) {
        try {
            const email = req.body.email;
            const user = await Customer.findOne(
                { email },
                {
                    picture: 1,
                }
            );

            if (user === null) {
                return badResponse(res, "User not found!");
            }

            successResponse(res, "Found user!", { picture: user.picture });
        } catch (error) {
            console.log(error);
            errorResponse(res, "Internal server error!");
        }
    }

    async signUp(req, res) {
        try {
            let { email, name, password, social } = req.body;

            // Check if your with email already exists
            const userWithEmail = await Customer.findOne({
                email,
            });

            if (userWithEmail) {
                return errorResponse(
                    res,
                    "A user with this email already exists!"
                );
            }

            // Create a square customer
            let customer_id;

            try {
                const customer = await square.post("/customers", {
                    given_name: name,
                    email_address: email,
                });

                customer_id = customer.data.customer.id;
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }

            password = await genHash(password);

            let picture = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

            const user = await Customer.create({
                customer_id,
                name,
                email,
                password,
                picture,
                social,
            });

            const token = genAccessToken(
                {
                    _id: user._id.toString(),
                    email,
                    name,
                    type: "customer",
                },
                undefined,
                "1yr"
            );

            successResponse(res, "Account Created Successfully!", {
                token,
                user: {
                    _id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    picture: user.picture,
                    billingAddress: user.billingAddress,
                    shippingAddress: user.shippingAddress,
                },
            });
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await Customer.findOne({
                email,
            });

            if (!user) {
                return errorResponse(res, "User not found!");
            }

            if (compareHash(password, user.password)) {
                const token = genAccessToken({
                    _id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    type: "customer",
                });

                return successResponse(res, "Login successful", {
                    token,
                    user: {
                        _id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        gender: user.gender,
                        picture: user.picture,
                        billingAddress: user.billingAddress,
                        shippingAddress: user.shippingAddress,
                    },
                });
            }

            return errorResponse(res, "Invalid Password!");
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async addCard(req, res) {
        try {
            let { card, token, verify } = req.body;

            const user = await Customer.findOne({
                _id: req.user._id.toString(),
            });

            if (!user) {
                return errorResponse(res, "User not found!");
            }

            try {
                // const res = await square.post("/cards", {
                //     idempotency_key: randomUUID(),
                //     source_id: token,
                //     verification_token: verify,
                //     card: {
                //         cardholder_name: user.name,
                //         customer_id: user.customer_id,
                //         exp_month: card.expMonth,
                //         exp_year: card.expYear,
                //         billing_address: {
                //             address_line_1: user.billingAddress,
                //         },
                //     },
                // });

                // console.log(res.data);
                // card.bin = res.data.card.bin;
                // card.fingerprint = res.data.card.fingerprint;
                // card.card_type = res.data.card.card_type;
                // card.prepaid_type = res.data.card.prepaid_type;
                // card.created_at = res.data.card.created_at;
                // card.cardholder_name = res.data.card.cardholder_name;
                // card.verification_token = verify;
            } catch (e) {
                console.log(e.response.data);
                throw new Error(e);
            }

            user.card = card;
            user.card_token = token;

            await user.save();

            return successResponse(res, "Card Added Successfully!");
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async getCard(req, res) {
        try {
            const user = await Customer.findOne({
                _id: req.user._id.toString(),
            });

            if (!user) {
                return errorResponse(res, "User not found!");
            }

            return successResponse(
                res,
                "Fetched Card Successfully!",
                user.card
            );
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await Customer.findOne({
                _id: req.user._id.toString(),
            });

            if (!user) {
                return errorResponse(res, "User not found!");
            }

            user.billingAddress = req.body.billingAddress;
            user.shippingAddress = req.body.shippingAddress;

            await user.save();

            return successResponse(res, "Updated User Successfully!", user);
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async getTransactions(req, res) {
        try {
            const user = await Customer.findOne({
                _id: req.user._id.toString(),
            });

            if (!user) {
                return errorResponse(res, "User not found!");
            }

            const transactions = await Transaction.find({
                customer: user._id,
            });

            return successResponse(
                res,
                "Fetched Transactions Successfully!",
                transactions
            );
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async getActiveItem(req, res) {
        try {
            const { username } = req.query;

            const user = await User.findOne({
                tiktok: username,
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
}

module.exports = new Controller();
