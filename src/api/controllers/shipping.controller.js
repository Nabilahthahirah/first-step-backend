const axios = require('axios')
const qs = require('qs')
require('dotenv').config()

const getShippingCost = async(destinationCityId, originCityId, weight, courier) => {
  try {

    // get cost data
    const data = {
      origin: originCityId,
      destination: destinationCityId,
      weight,
      courier,
    }

    const options = {
      headers: {
        key: apiRajaOngkir,
        'content-type': 'application/x-www-form-urlencoded',
      },
    }
    
    const response = await axios.post(`https://api.rajaongkir.com/starter/cost`, qs.stringify(data), options)

    const cost = response.data.rajaongkir.results[0].costs[0].cost[0].value

    if(cost) {
      return cost
    } else {
      console.error('Invalid API Response')
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed calculate shipping cost" })
  }
}

module.exports = getShippingCost
