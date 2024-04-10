const axios = require("axios");
const { SQUARE_TOKEN, SQUARE_API } = process.env;

const square = axios.create({
    baseURL: SQUARE_API,
    headers: {
        Authorization: `Bearer ${SQUARE_TOKEN}`,
        "Content-Type": "application/json",
    },
});

module.exports = square;
