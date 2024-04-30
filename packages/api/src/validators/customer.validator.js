const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const updateAddressSchema = Joi.object({
    billingAddress: Joi.string().required(),
    shippingAddress: Joi.string().required(),
});

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(5)
        .pattern(/^(?=.*[A-Z])(?=.*\d)/)
        .message(
            "Password must contain at least one uppercase letter and one number"
        )
        .required(),
    name: Joi.string().min(5).max(50).required(),
    // username: Joi.string().min(3).max(15).required(),
    // address: Joi.string().min(10).max(1000).required(),
    social: Joi.string().valid("tiktok", "youtube").required(),
});

const checkEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = {
    loginSchema,
    checkEmailSchema,
    signUpSchema,
    updateAddressSchema,
};
