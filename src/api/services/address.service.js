//src/api/services/address.service.js
const prisma = require('../../lib/prisma');

const createAddress = async (userId, addressData) => {
    try {
      const createdAddress = await prisma.address.create({
        data: {
          ...addressData,
          user: { connect: { id: userId } },
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
      where: { user: { id: userId } }, 
    });

    return addresses;
  } catch (error) {
    console.error('Error getting addresses:', error);
    throw new Error('Internal server error');
  }
};

const updateAddress = async (userId, addressId, updatedData) => {
  try {
    const updatedAddress = await prisma.address.update({
      where: { id: addressId, user: { id: userId } },
      data: {
        address: updatedData.address,
        city: updatedData.city,
        postal_code: updatedData.postal_code,
        phone: updatedData.phone,
      },
    });

    return updatedAddress;
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('Failed to update address');
  }
};

const deleteAddress = async (userId, addressId) => {
  try {
    await prisma.address.delete({
      where: { id: addressId, user: { id: userId } }, 
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
  updateAddress,
  deleteAddress,
};
