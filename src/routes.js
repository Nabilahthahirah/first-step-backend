const router = require("express").Router()
// const crudCategory = require("./api/routes/category.route")
// const crudProduct = require("./api/routes/product.route")
// const crudUser = require("./api/routes/user.route")
// const adminRoute = require("./api/routes/admin.route")
// const crudPaymentMethod = require("./api/routes/payment-method.route")
const orderRoute= require("./api/routes/order.route")
// const { verifyTokenAdmin } = require("../src/api/middlewares/verifyTokenMiddleware")
const getShippingCost = require("./api/controllers/shipping.controller")

// api routes
// router.use("/api/category", crudCategory)
// router.use("/api/admin", adminRoute)
// router.use("/api/products", crudProduct)
// router.use("/api/paymentmethod", crudPaymentMethod)
// router.use("/api/user", crudUser)
router.use("/api/order", orderRoute)
router.use("/cost", getShippingCost)

module.exports = router