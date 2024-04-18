const {
    sendResponse,
    badResponse,
    successResponse,
    errorResponse,
} = require("../helpers/response");
const { genHash, compareHash, genAccessToken } = require("../helpers");
const User = require("../models/users.model");
const Product = require("../models/products.model");
const Transaction = require("../models/transactions.model");

class Controller {
    async getUser(req, res) {
        try {
            const user = await User.findOne({
                tiktok: req.query.username.toString(),
            });

            if (!user) {
                return errorResponse(res, "User not found!");
            }

            return successResponse(res, "Fetched User Successfully!", user);
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async updateUser(req, res) {
        try {
            const _id = req.user._id;
            const name = req.body.name;
            const tiktok = req.body.tiktok;
            const picture = req.body.picture;

            const user = await User.findOne({
                _id,
            });

            if (!user) {
                return errorResponse(res, "User not found!");
            }

            user.name = name || user.name;
            user.tiktok = tiktok || user.tiktok;
            user.picture = picture || user.picture;

            await user.save();
            return successResponse(res, "Updated User Successfully!", user);
        } catch (error) {
            console.log(error);
            errorResponse(res);
        }
    }

    async getTransactions(req, res) {
        try {
            const transactions = await Transaction.find({
                user: req.user._id,
            })
                .populate({
                    path: "item",
                    select: {
                        name: 1,
                        images: { $slice: ["$images", 1] },
                    },
                })
                .sort({ createdAt: -1 });

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
}

module.exports = new Controller();
