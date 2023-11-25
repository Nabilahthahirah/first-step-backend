const prisma = require('../../lib/prisma');
const CustomAPIError = require('../middlewares/custom-error');
const { PrismaClient } = require('@prisma/client');

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
  return await prisma.cart_Product.findMany();
};

const addToCart = async (product_id, quantity) => {
  if (!product_id || !quantity || isNaN(quantity) || quantity <= 0) {
    throw new CustomAPIError('Invalid data', 400);
  }

  return await prisma.cart_Product.upsert({
    where: { product_id },
    update: { quantity: { increment: quantity } },
    create: { product_id, quantity },
  });
};

const updateCartProduct = async (product_id, newQuantity) => {
  if (!product_id || isNaN(newQuantity) || newQuantity <= 0) {
    throw new CustomAPIError('Invalid data', 400);
  }

  return await prisma.cart_Product.update({
    where: { product_id },
    data: { quantity: newQuantity },
  });
};

const removeFromCart = async (product_id) => {
  if (!product_id) {
    throw new CustomAPIError('Invalid data', 400);
  }

  return await prisma.cart_Product.deleteMany({ where: { product_id } });
};

module.exports = {
  fetchAllUsers,
  fetchUsersById,
  getCartProduct,
  addToCart,
  updateCartProduct,
  removeFromCart,
};
