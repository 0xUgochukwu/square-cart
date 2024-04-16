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
    Controller.deleteItem(req, res);
});

router.post("/:productId", auth("user"), (req, res) => {
    Controller.updateItem(req, res);
});

router.post("/buy/:productId", auth("customer"), (req, res) => {
    Controller.buyItem(req, res);
});

router.get("/", auth("user"), (req, res) => {
    Controller.getItems(req, res);
});

router.get("/active", auth("user"), (req, res) => {
    Controller.getActiveItem(req, res);
});

router.post("/active/:productId", auth("user"), (req, res) => {
    Controller.setActiveItem(req, res);
});

router.get("/watch", (req, res) => {
    Controller.watchForPurchase(req, res);
});

router.get("/:productId", auth("user"), (req, res) => {
    Controller.getItem(req, res);
});

router.post("/refund", auth("user"), (req, res) => {
    Controller.refundItem(req, res);
});

module.exports = router;
