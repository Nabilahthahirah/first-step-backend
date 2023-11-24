const prisma = require("../../lib/prisma");
const { 
    getAllProducts,
    createProduct,
    getSingleProduct,
    deleteProduct,
    createProductDetail,
    deleteProductDetail,
} = require("../controllers/product.controller");
const router = require("express").Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);

// Product Detail
router.post("/details/:id", createProductDetail);
router.delete("/details/:id", deleteProductDetail);

module.exports = router;
