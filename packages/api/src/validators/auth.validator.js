const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Z])(?=.*\d)/)
        .message(
            "Password must contain at least one uppercase letter and one number"
        )
        .required(),
    name: Joi.string().min(6).max(50).required(),
    tiktok: Joi.string().min(3).max(15).required(),
});

const checkEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

module.exports = {
    loginSchema,
    checkEmailSchema,
    signUpSchema,
};
