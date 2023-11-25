const prisma = require("../../lib/prisma")
const CustomAPIError = require("../middlewares/custom-error")

const findAllOrderStatuses = async () => {
  try {
    const orderStatuses = await prisma.orderStatus.findMany()
    return orderStatuses
  } catch (error) {
    throw error
  }
}

const findOneOrderStatus = async (orderStatusId) => {
  try {
    const orderStatus = await prisma.orderStatus.findUnique({
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

// const createOrderStatus = async (orderId, status) => {
//   try {
//     const newOrderStatus = await prisma.orderStatus.create({
//       data: {
//         order: {
//           connect: {
//             id: +orderId,
//           },
//         },
//         status,
//       },
//     })

//     return newOrderStatus
//   } catch (error) {
//     throw error
//   }
// }

// const updateOrderStatus = async (orderStatusId, status) => {
//   try {
//     const updatedOrderStatus = await prisma.orderStatus.update({
//       where: {
//         id: +orderStatusId,
//       },
//       data: {
//         status,
//       },
//     })

//     return updatedOrderStatus
//   } catch (error) {
//     throw error
//   }
// }

// const destroyOrderStatus = async (orderStatusId) => {
//   try {
//     const deletedOrderStatus = await prisma.orderStatus.delete({
//       where: {
//         id: +orderStatusId,
//       },
//     })

//     return deletedOrderStatus
//   } catch (error) {
//     throw error
//   }
// }

module.exports = {
  // findAllOrderStatuses,
  findOneOrderStatus,
  // createOrderStatus,
  // updateOrderStatus,
  // destroyOrderStatus,
}

