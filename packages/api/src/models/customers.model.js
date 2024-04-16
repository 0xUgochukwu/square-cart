const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    picture: {
        type: String,
        unique: true,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    social: {
        type: String,
        default: null,
    },
    username: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: null,
    },
    card_token: {
        type: String,
        default: null,
    },
    card: {
        type: Object,
        default: {},
    },
    shippingAddress: {
        type: String,
        default: "",
    },
    billingAddress: {
        type: String,
        default: "",
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
