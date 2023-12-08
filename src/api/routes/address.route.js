// src/api/routes/address.routes.js

const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const { verifyTokenUser } = require('../middlewares/verifyTokenMiddleware');

router.post('/', verifyTokenUser, addressController.createAddress);
router.get('/', verifyTokenUser, addressController.getAllAddresses);
router.get('/:id', verifyTokenUser, addressController.getAddressById);
router.put('/:id', verifyTokenUser, addressController.updateAddress);
router.delete('/:id', verifyTokenUser, addressController.deleteAddress);

module.exports = router;

