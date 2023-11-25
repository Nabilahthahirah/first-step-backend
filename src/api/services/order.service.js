const prisma = require('../../lib/prisma')
const CustomAPIError = require("../middlewares/custom-error")
const axios = require('axios')
const qs = require('qs')
require('dotenv').config()

const findAllOrders = async (params) => {
  const filterOptions = {
    where: {},
    include: {
      // cart: {
      //   include: {
      //     user_id: true
      //   }
      // },
      cart: true,
      address: true,
      order_status: true,
      payment: true,
    },
    orderBy: {
      id: 'asc',
    },
  }

  try {
    const orders = await prisma.order.findMany(filterOptions)

    return orders
  } catch (error) {
    console.log('Error fetching orders:', error)
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500)
  }
}

const findOneOrder = async (params) => {
  try {
    const { id } = params

    const order = await prisma.order.findUnique({
      where: {
        id: +id,
      },
      include: {
        cart: true,
        address: true,
        order_status: true,
        payment: true,
      },
    })

    if (!order) {
      throw new CustomAPIError(`No Order with id ${id} was found`, 400)
    }

    return order
  } catch (error) {
    console.log(error)
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500)
  }
}


const createOrder = async (address_user, address_warehouse, cart_id) => {
  try {
    // const { cart_id, address_id, shipping_price, price } = params

    const cartProducts = await prisma.Cart_Product.findMany({
      where: {
        cart_id: +cart_id,
      },
      include: {
        product: {
          include: {
            product_detail: true,
          },
        },
      }
    });

    const totalWeight = cartProducts.reduce((total, cartProduct) => {
      const itemWeight = cartProduct.product.product_detail.weight || 0;
      return total + cartProduct.quantity * itemWeight;
    }, 0);

    const totalProductPrice = cartProducts.reduce((total, cartProduct) => {
      const itemPrice = cartProduct.product.price || 0;
      return total + cartProduct.quantity * itemPrice;
    }, 0);

    const userAddress = await prisma.address.findUnique({
      where: {
        id: address_user,
      },
      include: {
        city: true,
      },
    });

    const warehouseAddress = await prisma.address.findUnique({
      where: {
        id: address_warehouse,
      },
      include: {
        city: true,
      },
    });

    const apiRajaOngkir = process.env.RAJA_ONGKIR

    const data = {
      origin: warehouseAddress.city_id,
      destination: userAddress.city_id,
      weight: totalWeight,
      courier: 'jne',
    }

    const options = {
      headers: {
        key: apiRajaOngkir,
        'content-type': 'application/x-www-form-urlencoded',
      },
    }

    const response = await axios.post(`https://api.rajaongkir.com/starter/cost`, qs.stringify(data), options)

    // Ambil ongkos kirim dari response
    const shippingCost = response.data.rajaongkir.results[0].costs[0].cost[0].value;

    const totalPrice = totalProductPrice + shippingCost

    // Membuat pesanan baru dalam database
    const newOrder = await prisma.order.create({
      data: {
        cart_id: +cart_id,
        address_id: +address_id,
        shipping_price: +shippingCost,
        price: +totalProductPrice,
        
        order_status: {
          create: {
            status: 'Pending',
          },
        },
        
        payment: {
          create: {
            payment_method: {
              connect: {
                // ID metode pembayaran default
                id: 1,
              },
            },
            total_price: +totalPrice,
          },
        },
      },
      include: {
        cart: {
          include: {
            user_id: true,
            cart_product: true
          }
        },
        address: true,
        order_status: true,
        payment: true,
      },
    })

    return newOrder
  } catch (error) {
    console.log(error)
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500)
  }
}

// const updateOrder = async (orderId, params) => {
//   try {
//     const { cart_id, address_id, shipping_price, price, status } = params

//     const updatedOrder = await prisma.order.update({
//       where: {
//         id: +orderId,
//       },
//       data: {
//         cart_id: +cart_id,
//         address_id: +address_id,
//         shipping_price: +shipping_price,
//         price: +price,
//         order_status: {
//           update: {
//             status: status || undefined, 
//           },
//         },
//       },
//       include: {
//         cart: true,
//         address: true,
//         order_status: true,
//         payment: true,
//       },
//     })

//     return updatedOrder
//   } catch (error) {
//     console.log(error)
//     throw new CustomAPIError(`${error.message}`, error.statusCode || 500)
//   }
// }

const destroyOrder = async (params) => {
  try {
    
    const { id } = params

    const deletedOrder = await prisma.order.delete({
      where: {
        id: +id,
      },
      include: {
        cart: true,
        address: true,
        order_status: true,
        payment: true,
      },
    })

    return deletedOrder
  } catch (error) {
    console.log(error)
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500)
  }
}

module.exports = {
    findAllOrders,
    findOneOrder,
    createOrder,
    // updateOrder,
    destroyOrder
}