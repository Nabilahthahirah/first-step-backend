// const { order } = require('../../lib/prisma')
const CustomAPIError = require('../middlewares/custom-error')
const shippingServices = require('../services/shipping.service')

const getShipping = async(req, res) => {

  const {cart_id} = req.params

  const {courier} = req.query

  try {

    const cost = await shippingServices.fetchShipping(cart_id, courier)
  
    res.status(200).json({
        status: "success",
        message: "Get Shipping Fee",
        data: cost,
    })

  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500)
  }
}

module.exports = {
  getShipping
}