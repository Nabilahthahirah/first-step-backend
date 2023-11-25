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
    const { productId, quantity } = req.body;

    if (!productId || !quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    await addToCart(productId, quantity);

    const cartProduct = await getCartProduct();
    res.json(cartProduct);
  } catch (error) {
    next(error);
  }
};

const updateCartProductController = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    await updateCartProduct(productId, quantity);

    const cartProduct = await getCartProduct();
    res.json(cartProduct);
  } catch (error) {
    next(error);
  }
};

const removeFromCartController = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    await removeFromCart(productId);

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
