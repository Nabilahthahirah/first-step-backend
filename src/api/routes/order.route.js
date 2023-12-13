const controllers = require("../controllers/order.controller")
const express = require("express")
const router = express.Router()

router.get("/", controllers.getAllOrders)
router.get("/cart/:id", controllers.getOneOrderByCart)
router.get("/:id", controllers.getOneOrder)
router.post("/", controllers.createOrder)
router.delete("/:id", controllers.deleteOrder)

router.get("/user/:id", controllers.getUserbyOrder);

module.exports = router