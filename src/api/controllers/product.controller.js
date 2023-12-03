const { 
  fetchAllProducts, 
  postFullProduct, 
  fetchSingleProductById, 
  deleteFullProduct,
  postProductDetail,
  deleteOneProductDetail,
  fetchAllProductsByCategory,
  fetchAllProductsBySearch
} = require("../services/product.service");
const CustomAPIError = require("../middlewares/custom-error");
const cloudinary = require('../../lib/cloudinary');
const upload = require('../../lib/multer');

const getAllProducts = async (req, res) => {

  const { page, pageSize } = req.query;

  try {
    const { products, totalProductsCount } = await fetchAllProducts(
      parseInt(page),
      parseInt(pageSize)
    );

    const totalPages = Math.ceil(totalProductsCount / parseInt(pageSize));

    return res.json({
      status: "success",
      message: "All products are presented",
      data: {
        products,
        totalPages,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProductsByCategory = async (req, res) => {

  const {category_id} = req.params
  const { page, pageSize } = req.query;
  
  try {
    const { products, totalProductsCount } = await fetchAllProductsByCategory(
      category_id,
      parseInt(page),
      parseInt(pageSize)
    );

    const totalPages = Math.ceil(totalProductsCount / parseInt(pageSize));

    return res.json({
      status: "success",
      message: "All products are presented",
      data: {
        products,
        totalPages,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProductsBySearch = async (req, res) => {
  const { name, page, pageSize } = req.query;

  try {
    const { products, totalProductsCount } = await fetchAllProductsBySearch(
      name,
      parseInt(page),
      parseInt(pageSize)
    );

    const totalPages = Math.ceil(totalProductsCount / parseInt(pageSize));

    if (!products) {
      throw new CustomAPIError("error fetching product", 404);
    }

    return res.json({
      status: "success",
      message: "All products are presented",
      data: {
        products,
        totalPages,
      },
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

const getSingleProduct = async (req, res) => {
  const { id }  = req.params;
  const product = await fetchSingleProductById(id);
  if (!product) {
    throw new CustomAPIError("error fetching product", 404);
  }
  return res.json({
    status: "success",
    message: "Product is fetched successfully",
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteFullProduct(id);
  return res.json({
    status: "success",
    message: "product is deleted successfully",
    data: deletedProduct,
  });
};

// Product Detail
const createProductDetail = async (req, res) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { id } = req.params;
      const { color, stock, price, weight } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No image provided' });
      }

      cloudinary.uploader.upload(
        file.path,
        async (cloudinaryErr, result) => {
          if (cloudinaryErr) {
            return res.status(400).json({ error: cloudinaryErr.message });
          }
          const photo = result.secure_url;

          const createdProductDetail = await postProductDetail(
            id,
            {
              color,
              stock,
              price,
              weight,
              photo
            }
          );
          console.log(createProductDetail,"<<<<<<<<")

          return res.status(201).json({ productDetail: createdProductDetail });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteProductDetail = async (req, res) => {
  const { id } = req.params;
  const deletedProductDetail = await deleteOneProductDetail(id);
  return res.json({
    status: "success",
    message: "product detail is deleted successfully",
    data: deletedProductDetail,
  });
};



module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  createProductDetail,
  deleteProductDetail,
  getAllProductsByCategory,
  getAllProductsBySearch
};
