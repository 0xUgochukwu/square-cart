const Joi = require("joi");

const addProductSchema = Joi.object({
    name: Joi.string().min(6).max(15).required(),
    info: Joi.string().min(6).max(150).required(),
    price: Joi.number().min(1).max(10000).required(),
    quantity: Joi.number().optional(),
    images: Joi.array()
        .items(Joi.string().regex(/^data:image\/(png|jpeg|jpg);base64,/))
        .optional(),
});

module.exports = {
    addProductSchema,
};
