const prisma = require("../../lib/prisma");
const bcrypt = require('bcrypt');
const { generateToken } = require("../../lib/jwt");
const CustomAPIError = require("../middlewares/custom-error");

// Register User
const registerUser = async (userData) => {
  const { username, email, password, phone } = userData;

  try {
    // Check if username is taken
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      throw new CustomAPIError('Username is taken', 400);
    }

    // Check if email is registered before
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      throw new CustomAPIError('Email is registered before', 400);
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
      },
    });

    // Generate token after registration
    const token = generateToken(user);

    return { user, token };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new CustomAPIError(`${error.message}`, 500);
  }
};

// Login User
const loginUser = async (username, password) => {
  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new CustomAPIError('Invalid username or password', 401);
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password || '');

    if (!passwordMatch) {
      throw new CustomAPIError('Invalid username or password', 401);
    }

    // Generate token after successful login
    const token = generateToken(user);

    return { user, token };
  } catch (error) {
    console.error('Error logging in:', error);
    throw new CustomAPIError('Invalid username or password', 401);
  }
};

// Update User
const updateUser = async (userId, newData) => {
  try {
    // Update user data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: newData,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

// Delete User
const deleteUser = async (userId) => {
  try {
    // Hapus alamat terkait
    await prisma.address.deleteMany({
      where: { user_id: userId },
    });

    // Hapus pengguna
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

// Get User By Id
const getUserById = async (userId) => {
  try {
    // Find user by id
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    console.error('Error getting user by id:', error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

// Get All Users
const getAllUsers = async () => {
  try {
    // Find all users
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
