const { fetchAllProducts,
    postFullProduct
 } = require("../services/product.service");

const CustomAPIError = require("../middlewares/custom-error");
const prisma = require("../../lib/prisma");

const getAllProducts = async (req, res) => {
    try {
        const products = await fetchAllProducts();
        return res.json({
            status: "success",
            message: "All products are presented",
            data: products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createProduct = async (req, res) => {
    const product = await postFullProduct(req.body);
    return res.json({
        status: "success",
        message: "product is created successfully",
        data: product,
    });
};

module.exports = {
    getAllProducts,
    createProduct
};
