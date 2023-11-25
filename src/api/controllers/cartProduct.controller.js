const { getCartProduct, addToCart, updateCartProduct, removeFromCart } = require('../services/cartProduct.service');

const getCartProductController = async (req, res, next) => {
  try {
    const cartProduct = await getCartProduct();
    res.json(cartProduct);
  } catch (error) {
    next(error);
  }
};

const addToCartController = async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    await addToCart(product_id, quantity);

    const cartProduct = await getCartProduct();
    res.json(cartProduct);
  } catch (error) {
    next(error);
  }
};

const updateCartProductController = async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    await updateCartProduct(product_id, quantity);

    const cartProduct = await getCartProduct();
    res.json(cartProduct);
  } catch (error) {
    next(error);
  }
};

const removeFromCartController = async (req, res, next) => {
  try {
    const product_id = req.params.product_id;

    await removeFromCart(product_id);

    const cartProduct = await getCartProduct();
    res.json(cartProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartProductController,
  addToCartController,
  updateCartProductController,
  removeFromCartController,
};
