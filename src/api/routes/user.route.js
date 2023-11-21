const controllers = require("../controllers/user.controller");

const router = require("express").Router();
router.get("/", controllers.getAllUsers);
// router.get("/:id", controllers.getOneCategory);
// router.post("/", controllers.newCategory);
// router.put("/:id", controllers.updateCategory);
// router.delete("/:id", controllers.deleteCategory);

module.exports = router;