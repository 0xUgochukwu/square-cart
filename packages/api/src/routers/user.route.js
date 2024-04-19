const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validator.middleware");
const Controller = require("../controllers/user.controller");
const {
    loginSchema,
    checkEmailSchema,
    signUpSchema,
} = require("../validators/auth.validator");
const auth = require("../middlewares/auth.middleware");

router.get("/", (req, res) => {
    Controller.getUser(req, res);
});

router.post("/update", auth("user"), (req, res) => {
    Controller.updateUser(req, res);
});

router.get("/transactions", auth("user"), (req, res) => {
    Controller.getTransactions(req, res);
});

module.exports = router;
