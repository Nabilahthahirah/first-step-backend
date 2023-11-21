const prisma = require("../../lib/prisma");
const { 
    getAllProducts,
    createProduct } = require("../controllers/product.controller");
const router = require("express").Router();

router.get("/", getAllProducts);
router.post("/", createProduct);

module.exports = router;
