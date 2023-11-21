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
module.exports = {
    getAllUsers
};
