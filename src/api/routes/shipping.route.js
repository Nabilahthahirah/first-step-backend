const controllers = require("../controllers/shipping.controller")
const express = require("express")
const router = express.Router()

router.get("/:cart_id", controllers.getShipping)
// router.get("/:id", controllers.getOneOrder)

module.exports = router