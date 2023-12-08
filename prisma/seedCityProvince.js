// seeder.js
const { PrismaClient } = require('@prisma/client');
const axios = require('axios')
const prisma = new PrismaClient();
require('dotenv').config()

const seed = async() => {

  const apiRajaOngkir = process.env.RAJA_ONGKIR

  const responseProvinceUser = await axios.get('https://api.rajaongkir.com/starter/province', {
  headers: {
    key: apiRajaOngkir,
  },
});


const provincesData = responseProvinceUser.data.rajaongkir.results

  const responseCity = await axios.get('https://api.rajaongkir.com/starter/city', {
  headers: {
    key: apiRajaOngkir,
  },
});


const cityData = responseCity.data.rajaongkir.results

// console.log(provincesData)

  try {
    for (const provinceData of provincesData) {
      await prisma.province.create({
        data: {
          id: parseInt(provinceData.province_id),
          name: provinceData.province
        },
      });

      console.log(`Data berhasil disimpan.`);
    }
    for (const c of cityData) {
      await prisma.city.create({
        data: {
          id: parseInt(c.city_id),
          province_id: parseInt(c.province_id),
          name: c.city_name
        },
      });

      console.log(`Data berhasil disimpan.`);
    }

    console.log('Seeder selesai.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
