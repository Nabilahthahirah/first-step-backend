// src/api/services/address.service.js
const prisma = require('../../lib/prisma');

const createAddress = async (userId, addressData) => {
  try {
    const createdAddress = await prisma.address.create({
      data: {
        city: {
          connect: { id: addressData.city_id },
        },
        province: {
          connect: { id: addressData.province_id },
        },
        postal_code: addressData.postal_code,
        phone: addressData.phone,
        address: addressData.address,
        user: {
          connect: { id: userId },
        },
      },
      include: {
        city: true,
        province: true,
      },
    });

    return createdAddress;
  } catch (error) {
    console.error('Error creating address:', error);
    throw new Error('Failed to create address');
  }
};

const getAllAddresses = async (userId) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { user_id: userId },
      include: {
        city: true,
        province: true,
      },
    });

    // Menambahkan postal_code dan phone pada objek data
    const formattedAddresses = addresses.map(address => ({
      postal_code: address.postal_code,
      phone: address.phone,
      ...address,
    }));

    return formattedAddresses;
  } catch (error) {
    console.error('Error getting addresses:', error);
    throw new Error('Internal server error');
  }
};

const getAddressById = async (userId, addressId) => {
  try {
    const address = await prisma.address.findUnique({
      where: { id: addressId, user_id: userId },
      include: {
        city: true,
        province: true,
      },
    });

    if (!address) {
      throw new Error('Address not found');
    }

    // Menambahkan city_id dan province_id pada objek data
    const { city_id, province_id, ...addressData } = address;
    return { city_id, province_id, ...addressData };
  } catch (error) {
    console.error('Error getting address by ID:', error);
    throw new Error('Failed to get address by ID');
  }
};

const updateAddress = async (userId, addressId, updatedData) => {
  try {
    const { city_id, province_id, ...restData } = updatedData;

    const updatedAddress = await prisma.address.update({
      where: { id: addressId, user: { id: userId } },
      data: {
        ...restData,
        city: city_id
          ? {
              connect: { id: city_id },
            }
          : undefined,
        province: province_id
          ? {
              connect: { id: province_id },
            }
          : undefined,
      },
      include: {
        city: true,
        province: true,
      },
    });

    // Menambahkan city_id dan province_id pada objek data
    const { city_id: updatedCityId, province_id: updatedProvinceId, ...addressData } = updatedAddress;

    return {
      city_id: updatedCityId,
      province_id: updatedProvinceId,
      ...addressData,
    };
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('Failed to update address');
  }
};

const deleteAddress = async (userId, addressId) => {
  try {
    await prisma.address.delete({
      where: { id: addressId, user_id: userId },
    });

    return true;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw new Error('Failed to delete address');
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
