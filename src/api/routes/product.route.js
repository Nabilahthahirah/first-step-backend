const prisma = require("../../lib/prisma");
const { 
    getAllProducts,
    createProduct,
    getSingleProduct,
    deleteProduct,
    createProductDetail,
    deleteProductDetail,
    getAllProductsByCategory,
    getAllProductsBySearch
} = require("../controllers/product.controller");
const router = require("express").Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/search", getAllProductsBySearch);
router.get("/category/:category_id", getAllProductsByCategory);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);

// Product Detail
router.post("/details/:id", createProductDetail);
router.delete("/details/:id", deleteProductDetail);

module.exports = router;
