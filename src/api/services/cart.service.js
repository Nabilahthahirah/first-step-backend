const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const getCartByUserId = async (user_id) => {
  return prisma.cart.findUnique({
    where: { user_id: user_id },
    include: {
      cart_product: {
        include: { product: true },
        orderBy: {
          id: "asc", // Order by CartProduct id in ascending order
        },
      },
    },
  });
};

const createCartProduct = async (product_id, userId, quantity) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: true,
      },
    });

    let cart = user.cart; // Use user's cart if it exists

    if (!cart) {
      // If user doesn't have a cart, create a new one
      cart = await prisma.cart.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    // Menambahkan produk ke dalam keranjang
    const addedProduct = await prisma.cart_Product.create({
      data: {
        product: {
          connect: {
            id: product_id,
          },
        },
        cart: {
          connect: {
            id: 3,
          },
        },
        quantity: quantity,
      },
      include: {
        product: true,
      },
    });

    return addedProduct;
  } catch (error) {
    throw new Error(`Gagal menambahkan produk ke dalam keranjang: ${error}`);
  }
};

const deleteCartProduct = async (userId, productId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: {
          include: {
            cart_product: true,
          },
        },
      },
    });

    if (!user) {
      throw new CustomAPIError('User not found', 404);
    }

    const cart = user.cart;

    if (!cart) {
      throw new CustomAPIError('Cart not found', 404);
    }

    const cartProduct = cart.cart_product.find((item) => item.product.id === productId);

    if (!cartProduct) {
      throw new CustomAPIError('Cart product not found', 404);
    }

    await prisma.cart_Product.delete({
      where: { id: cartProduct.id },
    });

    return { message: 'Cart product deleted successfully' };
  } catch (error) {
    throw new CustomAPIError(error.message, 500);
  }
};


module.exports = {
  getCartByUserId,
  createCartProduct,
  deleteCartProduct,
};
