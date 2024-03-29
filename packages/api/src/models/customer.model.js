const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const transactionSchema = new mongoose.Schema({
    info: {
        type: String,
        default: "",
    },
    customer: {
        type: ObjectId,
        default: null,
    },
    user: {
        type: ObjectId,
        default: null,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        default: "PAID",
        enums: ["PAID", "REFUND"],
    },
    item: {
        type: ObjectId,
        default: null,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = Transaction;
