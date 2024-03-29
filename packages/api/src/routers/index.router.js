const { Router } = require("express");
const authRouter = require("./auth.route");
const customerRouter = require("./customer.route");
const userRouter = require("./user.route");
const productRouter = require("./product.route");

const v1 = new Router();

v1.use("/auth", authRouter);
v1.use("/product", productRouter);
v1.use("/user", userRouter);
v1.use("/customer", customerRouter);

module.exports = v1;
