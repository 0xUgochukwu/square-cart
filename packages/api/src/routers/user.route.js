const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validator.middleware");
const Controller = require("../controllers/user.controller");
const {
    loginSchema,
    checkEmailSchema,
    signUpSchema,
} = require("../validators/auth.validator");

router.get("/", (req, res) => {
    Controller.getUser(req, res);
});

module.exports = router;
