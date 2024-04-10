const {
    sendResponse,
    badResponse,
    successResponse,
    errorResponse,
} = require("../helpers/response");
const { genHash, compareHash, genAccessToken } = require("../helpers");
const User = require("../models/users.model");
const Product = require("../models/products.model");

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
}

module.exports = new Controller();
