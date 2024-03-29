const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validator.middleware");
const Controller = require("../controllers/customer.controller");
const {
    loginSchema,
    checkEmailSchema,
    signUpSchema,
    updateAddressSchema,
} = require("../validators/customer.validator");
const auth = require("../middlewares/auth.middleware");

router.post("/email", validate(checkEmailSchema), (req, res) => {
    Controller.checkEmail(req, res);
});

router.post("/signup", validate(signUpSchema), (req, res) => {
    Controller.signUp(req, res);
});

router.post("/login", validate(loginSchema), (req, res) => {
    Controller.login(req, res);
});

router.get("/card", auth(), (req, res) => {
    Controller.getCard(req, res);
});

router.post("/card", auth(), (req, res) => {
    Controller.addCard(req, res);
});

router.post("/update", auth(), validate(updateAddressSchema), (req, res) => {
    Controller.updateUser(req, res);
});

router.get("/transactions", auth(), (req, res) => {
    Controller.getTransactions(req, res);
});

router.get("/item", auth(), (req, res) => {
    Controller.getActiveItem(req, res);
});

module.exports = router;
