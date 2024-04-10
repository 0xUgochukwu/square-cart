const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validator.middleware");
const AuthController = require("../controllers/auth.controller");
const {
    loginSchema,
    checkEmailSchema,
    signUpSchema,
} = require("../validators/auth.validator");

router.post("/email", validate(checkEmailSchema), (req, res) => {
    AuthController.checkEmail(req, res);
});

router.post("/signup", validate(signUpSchema), (req, res) => {
    AuthController.signUp(req, res);
});

router.post("/admin/signup", validate(signUpSchema), (req, res) => {
    AuthController.signUpAdmin(req, res);
});

router.post("/login", validate(loginSchema), (req, res) => {
    AuthController.login(req, res);
});

module.exports = router;
