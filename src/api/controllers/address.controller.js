// src/api/controllers/address.controller.js

const prisma = require('../../lib/prisma');
const addressService = require('../services/address.service');

const createAddress = async (req, res) => {
  const userId = req.user.id;
  const addressData = req.body;

  try {
    const createdAddress = await addressService.createAddress(userId, addressData);
    res.status(201).json(createdAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(400).json({ message: error.message });
  }
};

const getAllAddresses = async (req, res) => {
  const userId = req.user.id;

  try {
    const addresses = await addressService.getAllAddresses(userId);
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAddressById = async (req, res) => {
  const userId = req.user.id;
  const addressId = parseInt(req.params.id, 10);

  try {
    const address = await addressService.getAddressById(userId, addressId);
    res.status(200).json(address);
  } catch (error) {
    console.error('Error getting address by ID:', error);
    res.status(404).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  const userId = req.user.id;
  const addressId = parseInt(req.params.id, 10);
  const updatedData = req.body;

  try {
    const updatedAddress = await addressService.updateAddress(userId, addressId, updatedData);
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
    await addressService.deleteAddress(userId, addressId);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
