const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const fetchAllProducts = async (page, pageSize) => {
  try {
    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { product_detail: true },
    });

    const totalProductsCount = await prisma.product.count();

    if (!products) {
      throw new CustomAPIError(`Product Not Found`, 404);
    }
  
    return {
      products,
      totalProductsCount
    };
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message} `,
      error.statusCode || 500
    );
  }
};

const fetchAllProductsByCategory = async (category_id, page, pageSize) => {
  try {
    const products = await prisma.product.findMany({
    
      where: {
        category_id: +category_id
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { 
        product_detail: true 
      },
    });

    const totalProductsCount = await prisma.product.count({
      where: {
        category_id: +category_id
      },
    });

    if (!products) {
      throw new CustomAPIError(`Product Not Found`, 404);
    }
  
    return {
      products,
      totalProductsCount
    };
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message} `,
      error.statusCode || 500
    );
  }

};

const fetchAllProductsBySearch = async (name, page, pageSize) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { 
        product_detail: true 
      },
    });

    const totalProductsCount = await prisma.product.count({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    if (!products) {
      throw new CustomAPIError(`Product Not Found`, 404);
    }
  
    return {
      products,
      totalProductsCount
    };
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message} `,
      error.statusCode || 500
    );
  }

};

const postFullProduct = async (data) => {
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
          create: product_detail
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

const fetchSingleProductById = async (data) => {
  let product;
  console.log
  // Check if the input is numeric, assuming it's an ID
  if (!isNaN(data)) {
    product = await prisma.product.findUnique({
      where: {
        id: +data, // Convert data to a number
      },
      include: {
        category: true,
        warehouse: true,
        product_detail: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });
  } 

  if (!product) {
    throw new CustomAPIError(`No product found with id: ${data}`, 400);
  }

  return product;
};

const deleteFullProduct = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id: +id },
    include: { product_detail: true },
  });

  if (!product) {
    throw new CustomAPIError(`No product with id of ${id}`, 400);
  }

  // Delete Product
  await prisma.product.delete({
    where: { id: +id },
    include: {
      product_detail: true,
    },
  });

  return {
    deletedProduct: product,
  };
};


// Product Detail
const postProductDetail = async (productId, data) => {
  try {
    let {
      product_id = +productId,
      photo,
      color,
      price = +price,
      stock = +stock,
      weight = +weight,
    } = data;

    const createdProductDetail = await prisma.product_Detail.create({
      data: {
        product_id,
        photo,
        color,
        stock: parseInt(stock), // Mengubah string menjadi nilai integer
        price: parseFloat(price), // Mengubah string menjadi nilai float
        weight: parseFloat(weight), // Mengubah string menjadi nilai float
      },
    });
    console.log(createdProductDetail,"<<<<<<<<<<")
    return createdProductDetail;
  } catch (error) {
    throw new Error(`Error in creating product detail: ${error.message}`);
  }
}

const deleteOneProductDetail = async (id) => {
  const productDetail = await prisma.product_Detail.findUnique({
    where: { id: +id },
  });

  if (!productDetail) {
    throw new CustomAPIError(`No product detail with id of ${id}`, 400);
  }

  await prisma.product_Detail.delete({
    where: { id: +id },
  });

  return {
    deletedProductDetail: productDetail,
  };
};

module.exports = {
    fetchAllProducts,
    postFullProduct,
    fetchSingleProductById,
    deleteFullProduct,
    postProductDetail,
    deleteOneProductDetail,
    fetchAllProductsByCategory,
    fetchAllProductsBySearch
  };