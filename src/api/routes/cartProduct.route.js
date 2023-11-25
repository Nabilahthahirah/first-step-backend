const express = require('express');
const { getCartProductController, addToCartController, updateCartProductController, removeFromCartController } = require('../controllers/cartProduct.controller');

const router = express.Router();

router.get('/', getCartProductController);
router.post('/', addToCartController);
router.put('/', updateCartProductController);
router.delete('/', removeFromCartController);

module.exports = router;
