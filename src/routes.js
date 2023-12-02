const router = require("express").Router()
const orderRoute= require("./api/routes/order.route")
const shippingRoute= require("./api/routes/shipping.route")
const orderStatusRoute= require("./api/routes/order-status.route")
const userRoute = require("./api/routes/user.route");

router.use("/api/order-status", orderStatusRoute)
router.use("/api/order", orderRoute)
router.use("/api/shipping", shippingRoute)
router.use("/api/user", userRoute);

module.exports = router