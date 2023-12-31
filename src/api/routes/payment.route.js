const controllers = require("../controllers/payment.controller");
const router = require("express").Router();

router.get("/", controllers.getAllpayments);
router.get("/order/:id", controllers.getOnepaymentByOrder);
router.get("/:id", controllers.getOnepayments);
router.post("/", controllers.newPayments);
router.put("/upload/:id", controllers.updatePhoto);
router.put("/:id", controllers.updatePayment);
router.delete("/:id", controllers.deletePayment);

module.exports = router;
