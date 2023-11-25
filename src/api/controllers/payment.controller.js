const CustomAPIError = require("../middlewares/custom-error");
const paymentServices = require("../services/payment.service");

const getAllpayments = async (req, res) => {
  //Solved
  try {
    const payments = await paymentServices.findAll(req.query);
    if (payments.length === 0) {
      throw new CustomAPIError(`No Payments was found`, 400);
    }
    res.status(200).json({
      status: "success",
      message: "Get All Payments",
      data: payments,
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const getOnepayments = async (req, res) => {
  try {
    const payments = await paymentServices.findOne(req.params);
    res.status(200).json({
      status: "success",
      message: "Get Payment",
      data: payments,
    });
  } catch (error) {
    throw error;
  }
};

const newpayments = async (req, res) => {
  try {
    const payments = await paymentServices.create(req.body);
    if (!payments) {
      throw new CustomAPIError(`No Payment with id ${req.params.id}`, 400);
    }
    res.status(201).json({
      status: "success",
      message: "Create New Payment Succesfully",
      data: payments,
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error creating payment: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await paymentServices.update(req.params, req.body);
    res.status(200).json({
      status: "success",
      message: "Update Payment Succesfully",
      data: payment,
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await paymentServices.destroy(req.params);
    res.status(200).json({
      status: "success",
      message: "Delete Paymnet Succesfully",
      data: payment,
    });
  } catch (error) {
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  getAllpayments,
  getOnepayments,
  newpayments,
  updatePayment,
  deletePayment,
};
