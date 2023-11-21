const prisma = require("../../lib/prisma");
const slugify = require("../../lib/slugify");
const CustomAPIError = require("../middlewares/custom-error");

const fetchAllProducts = async () => { //solved
  const products = await prisma.product.findMany({
    include: { product_detail: true },
  });

  return products;
};

const postFullProduct = async (data) => { //solved
  try {
    let {
      name,
      description,
      type,
      category_id,
      warehouse_id,
      product_detail,
    } = data;

    if (product_detail.length <= 0) {
      throw new CustomAPIError(`please provide a product details`, 400);
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        type,
        category_id,
        warehouse_id,
        product_detail: {
          create: product_detail // Pastikan struktur create sesuai dengan model Product_Detail
        },
      },
      include: {
        product_detail: true,
      },
    });

    if (!product) {
      throw new CustomAPIError(`Product creation is failed`, 400);
    }
    return product;
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message} `,
      error.statusCode || 500
    );
  }
};

module.exports = {
    fetchAllProducts,
    postFullProduct
  };