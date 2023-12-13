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

const fetchUserDetail = async (id) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: id,
      },
    });

    if (!users[0]) {
      throw new CustomAPIError(`No User with id of ${id}`, 400);
    }

    return users;
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const fetchSingleUsersById = async (params) => {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: { id: +id },
    include: {
      cart: { include: { cart: true } },
      address: true,
    },
  });

  if (!user) {
    throw new CustomAPIError(`No user with id ${id}`, 400);
  }
  return user;
};

const postUser = async (data) => {
  let { username, email, password, phone, address, city_id, province_id, postal_code } = data;

  try {
    const existedUserUsername = await prisma.user.findFirst({
      where: { username: username },
    });

    if (existedUserUsername) {
      throw new CustomAPIError(`Username is taken`, 400);
    }

    const existedUserEmail = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existedUserEmail) {
      throw new CustomAPIError(`Email is registered before`, 400);
    }

    // hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword, // Use the hashed password here
          phone,
        },
        include: {
          address: true,
          cart: true,
        },
      });
      const userId = createdUser.id;

      if (createdUser) {
        await tx.address.create({
          data: {
            user_id: userId,
            city_id,
            address,
            province_id,
            postal_code,
            phone,
          },
        });
      }

      await tx.cart.create({ data: { user_id: createdUser.id } });
      return createdUser;
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, 500);
  }
};

const getUser = async (data) => {
  const { username, password } = data;
  if (!username) {
    throw new CustomAPIError("Invalid username or password", 401);
  }
  if (!password) {
    throw new CustomAPIError("Invalid username or password", 401);
  }
  // Step 1: Check if the username exists
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new CustomAPIError("Invalid username or password", 401);
  }

  // Step 2: Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new CustomAPIError("Invalid username or password", 401);
  }

  // Generate JWT token
  const token = generateToken(user);

  return token;
};

const putUser = async (pathParams, params) => {
  try {
    const { id } = pathParams;

    const user = await prisma.user.findUnique({
      where: { id: +id },
    });

    console.log(user);
    if (!user) {
      throw new CustomAPIError(`no user with id of ${id}`, 400);
    }

    const { username, email, password, phone } = params;
    console.log(params);
    if (password) {
      var hashedPassword = await bcrypt.hash(password, 10);
    }
    await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        username: username || user.username,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
      },
    });

    const updateUser = await prisma.user.findUnique({
      where: { id: +id },
    });
    return updateUser;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const destroyUser = async (params) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: +params.id },
      
    });

    if (!user) {
      throw new CustomAPIError(`No user with id ${params.id}`, 400);
    }

    console.log(params.id)

    await prisma.user.delete({
      where: {
        id: +params.id,
      },
      include: { address: true, cart: true },
    });

    return {
      deletedUser: user,
    };
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const fetchProvince = async () => {
  try {
    const province = await prisma.province.findMany({});

    return province;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const fetchCity = async (province_id) => {
  try {
    const city = await prisma.city.findMany({
      where: {
        province_id: +province_id,
      },
    });

    return city;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const fetchProvinceById = async (id) => {
  try {
    const province = await prisma.province.findUnique({
      where: {
        id: +id,
      },
    });

    return province;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

const fetchCityById = async (id) => {
  try {
    const city = await prisma.city.findUnique({
      where: {
        id: +id,
      },
    });

    return city;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, error.statusCode || 500);
  }
};

module.exports = {
  fetchAllUsers,
  fetchUserDetail,
  fetchSingleUsersById,
  postUser,
  getUser,
  putUser,
  destroyUser,
  fetchProvince,
  fetchCity,
  fetchProvinceById,
  fetchCityById,
};
