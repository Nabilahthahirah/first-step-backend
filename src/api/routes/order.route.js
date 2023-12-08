const controllers = require("../controllers/order.controller")
const express = require("express")
const router = express.Router()

router.get("/", controllers.getAllOrders)
router.get("/cart/:id", controllers.getOneOrderByCart)
router.get("/:id", controllers.getOneOrder)
router.post("/", controllers.createOrder)
router.delete("/:id", controllers.deleteOrder)

module.exports = router