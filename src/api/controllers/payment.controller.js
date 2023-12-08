const CustomAPIError = require("../middlewares/custom-error");
const paymentServices = require("../services/payment.service");

const uploadMulter = require("../../lib/multer");
const cloudinary = require("../../lib/cloudinary");
const midtransClient = require("midtrans-client");
require("dotenv").config();
const getAllpayments = async (req, res) => {
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

const getOnepaymentByOrder = async (req, res) => {
  try {
    const payments = await paymentServices.findOneByOrder(req.params);
    res.status(200).json({
      status: "success",
      message: "Get Payment",
      data: payments,
    });
  } catch (error) {
    throw error;
  }
};

const newPayments = async (req, res) => {
  try {
    const { order_id, payment_method_id, cart_id, total_price } = req.body;
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });
    const newPayments = await paymentServices.create(req.body);
    const parameter = {
      transaction_details: {
        order_id: +order_id,
        gross_amount: +total_price,
      },
      enabled_payments: ["other_qris"],
    };
    snap.createTransaction(parameter).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;
      res
        .status(200)
        .json({ message: "Success", dataPayment, token: token, newPayments });
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error creating payment: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const updatePhoto = async (req, res) => {
  try {
    uploadMulter.single("upload")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { id } = req.params;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No image provided" });
      }
      cloudinary.uploader.upload(file.path, async (cloudinaryErr, result) => {
        if (cloudinaryErr) {
          return res.status(400).json({ error: cloudinaryErr.message });
        }
        const upload = result.secure_url;
        req.body.upload = upload;
        const updatedUploads = await paymentServices.uploadPhoto(
          req.params,
          req.body
        );
        res.status(200).json({
          status: "success",
          message: "Update Upload Succesfully",
          data: updatedUploads,
        });
      });
    });
  } catch (error) {
    throw new CustomAPIError(
      `Error creating upload: ${error.message}`,
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
  getOnepaymentByOrder,
  newPayments,
  updatePayment,
  deletePayment,
  updatePhoto,
};
