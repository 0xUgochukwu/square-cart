const Joi = require("joi");

const addProductSchema = Joi.object({
    name: Joi.string().min(5).max(50).required().label("Product Name"),
    info: Joi.string().min(5).max(150).required(),
    price: Joi.number().min(1).max(10000).required(),
    quantity: Joi.number().optional(),
    images: Joi.array()
        .items(Joi.string().regex(/^data:image\/(png|jpeg|jpg);base64,/))
        .optional()
        .error(new Error("Image type is not supported!")),
});

const addYoutubeID = Joi.object({
    youtube_id: Joi.string().min(5).max(15).required(),
    start: Joi.number().min(0).required(),
    end: Joi.number().min(0).required(),
});

module.exports = {
    addProductSchema,
    addYoutubeID,
};
