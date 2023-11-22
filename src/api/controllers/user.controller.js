//src/api/controllers/user.controller.js
const userService = require('../services/user.service');

// Create User (Register)
const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const { user, token } = await userService.registerUser(userData);
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { user, token } = await userService.loginUser(username, password);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

// Read User By Id
const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Read All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update User
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userData = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, userData);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await userService.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
