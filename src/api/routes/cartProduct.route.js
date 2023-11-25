const express = require('express');
const { getCartProductController, addToCartController, updateCartProductController, removeFromCartController } = require('../controllers/cartProduct.controller');

const router = express.Router();

router.get('/cart', getCartProductController);
router.post('/cart/', addToCartController);
router.put('/cart/', updateCartProductController);
router.delete('/cart/', removeFromCartController);

module.exports = router;
