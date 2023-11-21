const router = require("express").Router();
const crudCategory = require("./api/routes/category.route");
const crudProduct = require("./api/routes/product.route");
const crudUser = require("./api/routes/user.route")
const adminRoute = require("./api/routes/admin.route");
const crudPaymentMethod = require("./api/routes/payment-method.route")
const { verifyTokenAdmin } = require("../src/api/middlewares/verifyTokenMiddleware");

// api routes
router.use("/api/category", crudCategory);
router.use("/api/admin", adminRoute);
router.use("/api/products", crudProduct);
router.use("/api/paymentmethod", crudPaymentMethod);
router.use("/api/user", crudUser);

module.exports = router;