// src/api/controllers/address.controller.js
const prisma = require('../../lib/prisma');

const createAddress = async (req, res) => {
  const userId = req.user.id;
  const addressData = req.body;

  try {
    const createdAddress = await prisma.address.create({
      data: {
        ...addressData,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(createdAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(400).json({ message: error.message });
  }
};

const getAllAddresses = async (req, res) => {
  const userId = req.user.id;

  try {
    const addresses = await prisma.address.findMany({
      where: { user_id: userId },
    });

    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAddress = async (req, res) => {
  const userId = req.user.id;
  const addressId = parseInt(req.params.id, 10);
  const updatedData = req.body;

  try {
    const updatedAddress = await prisma.address.update({
      where: { id: addressId, user_id: userId },
      data: updatedData,
    });

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(400).json({ message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  const userId = req.user.id;
  const addressId = parseInt(req.params.id, 10);

  try {
    await prisma.address.delete({
      where: { id: addressId, user_id: userId },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
};
