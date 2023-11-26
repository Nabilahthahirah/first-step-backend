const prisma = require("../../lib/prisma")
const CustomAPIError = require("../middlewares/custom-error")

const findAllOrderStatuses = async () => {
  try {
    const orderStatuses = await prisma.Order_Status.findMany()
    return orderStatuses
  } catch (error) {
    throw error
  }
}

const updateOrderStatus = async (orderStatusId) => {
  try {
    const orderStatus = await prisma.Order_Status.update({
      where: {
        id: +orderStatusId,
      },
    })

    if (!orderStatus) {
      throw new Error(`No Order_Status with id ${orderStatusId} found`)
    }

    return orderStatus
  } catch (error) {
    throw error
  }
}

module.exports = {
  findAllOrderStatuses,
  updateOrderStatus,
}

