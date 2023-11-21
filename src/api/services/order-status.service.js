const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (params) => {
  //Solved
  const filterOptions = {
    where: {},
    include: {
      product: { include: { product_detail: true } },
    },
    orderBy: {
      id: "asc", // Order by id in ascending order
    },
  };
  const { name } = params;

  if (name) {
    filterOptions.where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  const categories = await prisma.category.findMany(filterOptions);
  return categories;
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
