const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validator.middleware");
const Controller = require("../controllers/product.controller");
const { addProductSchema } = require("../validators/product.validator");
const auth = require("../middlewares/auth.middleware");

router.post("/add", auth("user"), validate(addProductSchema), (req, res) => {
    Controller.addItem(req, res);
});

router.delete("/:productId", auth("user"), (req, res) => {
    Controller.addItem(req, res);
});

router.post("/buy/:productId", auth("customer"), (req, res) => {
    Controller.buyItem(req, res);
});

router.get("/", auth("user"), (req, res) => {
    Controller.getItems(req, res);
});

module.exports = router;
