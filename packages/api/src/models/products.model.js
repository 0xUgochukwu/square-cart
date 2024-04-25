const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const productSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    info: {
        type: String,
        default: false,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    images: {
        type: [],
        default: [],
    },
    youtube_id: {
        type: String,
        default: null,
    },
    youtube_duration: {
        type: Object,
        default: {
            start: -1,
            end: -1,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
