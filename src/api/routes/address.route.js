const express = require('express');
const router = express.Router();
const { verifyTokenUser } = require('../middlewares/verifyTokenMiddleware');
const addressController = require('../controllers/address.controller');

router.post('/', verifyTokenUser, addressController.createAddress);
router.get('/', verifyTokenUser, addressController.getAllAddresses);
router.put('/:id', verifyTokenUser, addressController.updateAddress);
router.delete('/:id', verifyTokenUser, addressController.deleteAddress);

module.exports = router;