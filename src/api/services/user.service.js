const prisma = require("../../lib/prisma");
const bcrypt = require("bcryptjs");
const CustomAPIError = require("../middlewares/custom-error");
const { generateToken } = require("../../lib/jwt");

const fetchAllUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
          address: true, // Include associated addresses
          cart: true, // Include associated carts
        },
    });
    return users;
};

module.exports = {
    fetchAllUsers
};
