const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        default: "USD",
    },
    isLiveTikTok: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        unique: true,
        default: null,
    },
    balance: {
        type: Number,
        default: 0,
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
    tiktok: {
        type: String,
        default: null,
    },
    activeItem: {
        type: ObjectId,
        default: null,
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
