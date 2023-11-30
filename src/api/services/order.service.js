const prisma = require('../../lib/prisma')
const CustomAPIError = require("../middlewares/custom-error")
const axios = require('axios')
const qs = require('qs')
require('dotenv').config()

const findAllOrders = async (params) => {
  const filterOptions = {
    where: {},
    include: {
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


const createOrder = async (cart_id, userAddress) => {
  try {

    // find cart product
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

    const products = cartProducts[0].product

    const productDetails = products.product_detail
  
    const productQuantities = cartProducts.map((p) => p.quantity);

    // total weight from items
    const totalWeight = productDetails.reduce((total, productDetail, index) => {
      const itemWeight = productDetail.weight || 0;
      const quantity = productQuantities[index] || 0;
      return total + itemWeight * quantity;
    }, 0);
      
    // total price from items
    const totalProductPrice = productDetails.reduce((total, productDetail, index) => {
      const itemPrice = productDetail.price || 0;
      const quantity = productQuantities[index] || 0;
      return total + itemPrice * quantity;
    }, 0);

    // find detail user address
    const userAddress = await prisma.address.findUnique({
      where: {
        user_id: userAddress,
      },
      include: {
        city: true,
      },
    });

    const userAddressId = userAddress

    const warehouse = products.warehouse_id

    // find detail warehouse address
    const warehouseAddress = await prisma.address.findUnique({
      where: {
        id: warehouse,
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

    const response = await axios.post('https://api.rajaongkir.com/starter/cost', qs.stringify(data), options)

    // Log the response from RajaOngkir API
    console.log('RajaOngkir API Response:', response.data);

    // Check if the response indicates an error
    if (response.data.rajaongkir.status.code !== 200) {
      console.log('RajaOngkir API Error Message:', response.data.rajaongkir.message);
      throw new Error(`RajaOngkir API Error: ${response.data.rajaongkir.message}`);
    }

    // shipping fee from rajaongkir
    const shippingCost = response.data.rajaongkir.results[0].costs[0].cost[0].value;

    // total payment
    const totalPrice = totalProductPrice + shippingCost

    // create order in database
    const newOrder = await prisma.order.create({
      data: {
        cart_id: +cart_id,
        address_id: +userAddressId,
        shipping_price: +shippingCost,
        price: +totalProductPrice,
        order_status: {
          create: {
            status: 'Pending',
          },
        },
      },
      include: {
        cart: {
          include: {
            user: true,
            cart_product: true
          }
        },
        address: true,
        order_status: true,
        payment: true,
      },
    })

    if(newOrder) {
      
    }

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