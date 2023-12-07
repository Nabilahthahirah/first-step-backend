const CustomAPIError = require("../middlewares/custom-error");
const userServices = require("../services/user.service");

const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.fetchAllUsers(req.query);
    if (users.length === 0) {
      throw new CustomAPIError(`No users were found`, 404);
    }
    res.status(200).json({
      status: "success",
      message: "Get All Users",
      data: users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

const getUserId = async (req, res) => {
  const user = await userServices.fetchSingleUsersById(req.user);
  return res.json({
    status: "success",
    message: `User Id ${req.user} is getted`,
    data: user,
  });
};

const registerUser = async (req, res) => {
  console.log(req.body);
  const user = await userServices.postUser(req.body);
  return res.json({
    status: "success",
    message: "User is created successfully",
    data: user,
  });
};

const loginUser = async (req, res) => {
  const token = await userServices.getUser(req.body);
  return res.json({
    status: "success",
    message: "User is credential matched! Here is your token",
    data: token,
  });
};

const updateUser = async (req, res) => {
  const user = await userServices.putUser(req.user, req.body);
  return res.json({
    status: "success",
    message: "User is updated successfully",
    data: user,
  });
};

const deleteUser = async (req, res) => {
  const user = await userServices.destroyUser(req.user);
  return res.json({
    status: "success",
    message: "User is deleted successfully",
    data: user,
  });
};

const getProvince = async (req, res) => {
  const province = await userServices.fetchProvince()
  return res.json({
    status: "success",
    message: "Get province successfully",
    data: province,
  });
}

const getCity = async (req, res) => {
  const {province_id} = req.params

  const city = await userServices.fetchCity(province_id)
  
  return res.json({
    status: "success",
    message: "Get city successfully",
    data: city,
  });
}

const getProvinceById = async (req, res) => {
  const {id} = req.params

  const province = await userServices.fetchProvinceById(id)

  return res.json({
    status: "success",
    message: "Get province successfully",
    data: province,
  });
}

const getCityById = async (req, res) => {
  const {id} = req.params

  const city = await userServices.fetchCityById(id)
  
  return res.json({
    status: "success",
    message: "Get city successfully",
    data: city,
  });
}

module.exports = {
  getAllUsers,
  getUserId,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getProvince,
  getCity,
  getProvinceById,
  getCityById,
};
