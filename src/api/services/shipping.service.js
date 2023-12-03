const prisma = require('../../lib/prisma')
const CustomAPIError = require("../middlewares/custom-error")
const axios = require('axios')
const qs = require('qs')
require('dotenv').config()

const fetchShipping = async (cart_id) => {
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
      

    const cart = await prisma.Cart.findUnique({
      where: {
        id: +cart_id,
      }
    }) 

    const user = cart.user_id

    const userAddress = await prisma.address.findUnique({
      where: {
        user_id: user,
      },
      include: {
        city: true,
      },
    });

    const warehouse = products.warehouse_id

    // find detail warehouse address
    const warehouseAddress = await prisma.warehouse.findUnique({
      where: {
        id: warehouse,
      },
      include: {
        city: true,
      },
    });

    // const warehouseAddressId = warehouseAddress.city_id

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

    return shippingCost
  } catch (error) {
    console.log(error)
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500)
  }
}

module.exports = {
  fetchShipping
}