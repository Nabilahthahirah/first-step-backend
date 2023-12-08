const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (admin_id) => {
  try {
    const allWarehouse = await prisma.warehouse.findMany({
      where: {
        admin_id: admin_id,
      },
      include: {
        product: true,
      },
    });

    if (!allWarehouse[0]) {
      throw new CustomAPIError(`No warehouse with id of ${admin_id}`, 400);
    }

    return allWarehouse;
  } catch (error) {
    throw new CustomAPIError(`Error warehouse: ${error.message}`, 500);
  }
};

const create = async (admin_id, params) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: admin_id },
    });

    const { warehouse_name, address } = params;

    const createWarehouse = await prisma.warehouse.create({
      data: {
        address,
        warehouse_name,
        admin_id: admin.id,
        city_id: 1,
        province_id: 1,
      },
    });

    return createWarehouse;
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const update = async (admin_id, params) => {
  try {
    const warehouse = await prisma.warehouse.findUnique({
      where: { id: +admin_id},
    });

    if (!warehouse) {
      throw new CustomAPIError("Warehouse with id " + admin_id + " not found", 400);
    }

    const { warehouse_name, address } = params;
    const updatedWarehouse = await prisma.warehouse.update({
      where: { id: +admin_id },
      data: {
        address: address || warehouse.address,
        warehouse_name: warehouse_name || warehouse.warehouse_name,
        city_id: 1,
        province_id: 1,
      },
    });

    return updatedWarehouse;
  } catch (error) {
    throw new CustomAPIError(`Error updating warehouse: ${error.message}`, 500);
  }
};

const destroy = async (admin_id) => {
  const warehouse = await prisma.warehouse.findUnique({
    where: { id: +admin_id},
  });
  if (!warehouse) {
    throw new CustomAPIError("Warehouse with id " + admin_id + " not found", 400);
  }
  await prisma.warehouse.delete({
    where: {
      id: +warehouse.id,
    },
  });
  return {
    deletedAddress: warehouse,
  };
};

module.exports = {
  findAll,
  create,
  update,
  destroy,
};
