//src/api/routes/user.route.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

// Create User (Register)
router.post('/register', userController.createUser);

// Login User
router.post('/login', userController.loginUser);

// Read User By Id
router.get('/:id', verifyTokenUser, userController.getUserById);

// Read All Users
router.get('/', verifyTokenUser, userController.getAllUsers);

// Update User
router.put('/:id', verifyTokenUser, userController.updateUser);

// Delete User
router.delete('/:id', verifyTokenUser, userController.deleteUser);

module.exports = router;