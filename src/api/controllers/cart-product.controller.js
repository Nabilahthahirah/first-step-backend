const {
  update,
  deleteQuantity,
  createCartProduct,
} = require("../services/cart_product.service");

const updateQuantity = async (req, res) => {
  console.log("id", req.params);
  console.log("quantity", req.body);
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updated = await update(id, quantity);
    res.status(200).json({
      status: "success",
      message: "Update Quantity Succesfully",
      data: updated,
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};
const deletedQuantity = async (req, res) => {
  try {
    const deleteRecord = await deleteQuantity(req.params);
    res.status(200).json({
      message: "Delete Quantity Succesfully",
      data: deleteRecord,
    });
  } catch (error) {
    throw error;
  }
};

async function createdCartProduct(req, res) {
  const userId = req.user.id;

  const { product_id, quantity, price } = req.body;

  try {
    const createdCartProduct = await createCartProduct(
      userId,
      product_id,
      quantity,
      price
    );

    res.status(201).json({
      message: "Cart product created successfully",
      data: createdCartProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  updateQuantity,
  deletedQuantity,
  createdCartProduct,
};
