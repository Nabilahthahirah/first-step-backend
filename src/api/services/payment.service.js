const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (params) => {
  const payment = await prisma.payment.findMany({
  });
  return payment;
};

const findOne = async (params) => {
  try {
    const { id } = params;
    const payment = await prisma.payment.findUnique({
      where: {
        id: +id,
      },
      include: { upload: true },
    });

    if (!payment) {
      throw new CustomAPIError(`No Payment with id ${id} was found`, 400);
    }

    return payment;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const findOneByOrder = async (params) => {
  try {
    const { id } = params;
    const payment = await prisma.payment.findFirst({
      where: {
        order_id: +id,
      },
      include: { upload: true },
    });

    if (!payment) {
      throw new CustomAPIError(`No Payment with id ${id} was found`, 400);
    }

    return payment;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const create = async (params) => {
  try {
    const { order_id, payment_method_id, cart_id, total_price } = params;
    console.log("params", params);
    const payment = await prisma.payment.create({
      data: {
        order_id: +order_id,
        cart_id: +cart_id,
        payment_method_id: +payment_method_id,
        total_price: +total_price,
        status: "waiting",
      },
    });
    return payment;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating payment: ${error.message}`, 500);
  }
};

const update = async (pathParams, params) => {
  try {
    const { status } = params;
    const { id } = pathParams;

    const existingPayment = await prisma.payment.findUnique({
      where: {
        id: +id,
      },
    });

    if (existingPayment) {
      const updatePayment = await prisma.payment.update({
        where: {
          id: +id,
        },
        data: {
          order_id: existingPayment.order_id,
          cart_id: existingPayment.cart_id,
          payment_method_id: existingPayment.payment_method_id,
          total_price: existingPayment.total_price,
          status: status,
        },
      });
      return updatePayment;
    }
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500);
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;
    const payment = await prisma.payment.delete({
      where: {
        id: +id,
      },
    });
    return payment;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const process = async (params) => {
  try {
    const { id } = params;
    const payment = await prisma.payment.delete({
      where: {
        id: +id,
      },
    });
    return payment;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  findAll,
  findOne,
  findOneByOrder,
  create,
  update,
  destroy,
};
