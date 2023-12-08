const controllers = require("../controllers/email.controller");
const router = require("express").Router();

router.post("/", controllers.sendEmail);

module.exports = router;
