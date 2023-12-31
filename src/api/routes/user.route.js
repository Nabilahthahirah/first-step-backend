const controllers = require("../controllers/user.controller");
const { verifyTokenUser, verifyTokenAdmin } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/", controllers.getAllUsers);
router.get("/detail", verifyTokenUser, controllers.getUserDetail);
router.get("/province", controllers.getProvince);
router.get("/province/:id", controllers.getProvinceById);
router.get("/city/province/:province_id", controllers.getCity);
router.get("/city/:id", controllers.getCityById);
router.get("/:id", controllers.getUserId);
router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.put("/", verifyTokenUser, controllers.updateUser);
router.delete("/:id", verifyTokenAdmin, controllers.deleteUser);

module.exports = router;
