const prisma = require('../../lib/prisma');
const CustomAPIError = require('../middlewares/custom-error');
const { PrismaClient } = require('@prisma/client');
const prisma = require('../../lib/prisma');

const fetchAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      address: true, // Include associated addresses
      cart: true, // Include associated carts
    },
  });
  return users;
};

const fetchUsersById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: { include: { cart: true } },
        address: true,
      },
    });

    if (!user) {
      throw new CustomAPIError(`No user with id ${id}`, 400);
    }
    return user;
  } catch (error) {
    throw new CustomAPIError('Error fetchingUserById, 500');
  } finally {
    await prisma.$disconnect();
  }
};

const getCartProduct = async () => {
  return await prisma.cartProduct.findMany();
};

const addToCart = async (productId, quantity) => {
  if (!productId || !quantity || isNaN(quantity) || quantity <= 0) {
    throw new CustomAPIError('Invalid data', 400);
  }

  return await prisma.cartProduct.upsert({
    where: { productId },
    update: { quantity: { increment: quantity } },
    create: { productId, quantity },
  });
};

const updateCartProduct = async (productId, newQuantity) => {
  if (!productId || isNaN(newQuantity) || newQuantity <= 0) {
    throw new CustomAPIError('Invalid data', 400);
  }

  return await prisma.cartProduct.update({
    where: { productId },
    data: { quantity: newQuantity },
  });
};

const removeFromCart = async (productId) => {
  if (!productId) {
    throw new CustomAPIError('Invalid data', 400);
  }

  return await prisma.cartProduct.deleteMany({ where: { productId } });
};

module.exports = {
  fetchAllUsers,
  fetchUsersById,
  getCartProduct,
  addToCart,
  updateCartProduct,
  removeFromCart,
};
