const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  // Seed untuk Admin
  const admin = await prisma.admin.create({
    data: {
      username: "inibudi",
      email: "sukiem@example.com",
      password: "sukiem",
      address: "jalan sukiem",
    },
  });

  // Seed untuk Category
  const category1 = await prisma.category.create({
    data: {
      category_name: "makanan bayi",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      category_name: "pakaian Bayi",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      category_name: "Alat Mandi",
    },
  });

  // Seed untuk Warehouse
  const warehouse1 = await prisma.warehouse.create({
    data: {
      admin_id: admin.id,
      warehouse_name: "Main Warehouse",
      address: "jalan bekasi",
      province_id: 1,
      city_id: 1,
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      admin_id: admin.id,
      warehouse_name: "second Warehouse",
      address: "jalan jakarta",
      province_id: 1,
      city_id: 1,
    },
  });

  // Seed untuk User
  const user1 = await prisma.user.create({
    data: {
      username: "admin123",
      email: "hendika@example.com",
      password: "$2a$10$mZE5pgOrkxnpgmecBhtPVuWZCx6IVpd8nHuileq3He4SnvFY6aUm.",
      phone: "077777",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "hendika",
      email: "bangbang@example.com",
      password: "$2a$10$mZE5pgOrkxnpgmecBhtPVuWZCx6IVpd8nHuileq3He4SnvFY6aUm.",
      phone: "8474773",
    },
  });

  // Seed untuk Address
  const address1 = await prisma.address.create({
    data: {
      user_id: user1.id,
      address: "jalan R.A Kartini",
      postal_code: "12345",
      phone: "9876543210",
      city_id: 2, // Ganti dengan city_id yang sesuai
      province_id: 2, // Ganti dengan province_id yang sesuai
    },
  });
  const address2 = await prisma.address.create({
    data: {
      user_id: user1.id,
      address: "jalan Haji Nawi",
      postal_code: "3213",
      phone: "837273",
      city_id: 3, // Ganti dengan city_id yang sesuai
      province_id: 3, // Ganti dengan province_id yang sesuai
    },
  });
  const address3 = await prisma.address.create({
    data: {
      user_id: user2.id,
      address: "jalan pondok indah",
      postal_code: "723",
      phone: "3232",
      city_id: 4, // Ganti dengan city_id yang sesuai
      province_id: 4, // Ganti dengan province_id yang sesuai
    },
  });
  const address4 = await prisma.address.create({
    data: {
      user_id: user2.id,
      address: "jalan wijaya",
      postal_code: "312",
      phone: "463633",
      city_id: 5, // Ganti dengan city_id yang sesuai
      province_id: 5, // Ganti dengan province_id yang sesuai
    },
  });

  // Seed untuk Cart
  const cart1 = await prisma.cart.create({
    data: {
      user_id: user1.id,
      shipping_cost: 20000,
      total_payment: 100000,
      total_weight: 500,
      shipping_cost: 20000,
      total_payment: 100000,
      total_weight: 500,
      total_price: 120000,
    },
  });

  // Seed untuk Product
  const product1 = await prisma.product.create({
    data: {
      category_id: category1.id,
      warehouse_id: warehouse1.id,
      name: "promina",
      description: "rasa pisang",
      type: "makanan",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      category_id: category1.id,
      warehouse_id: warehouse1.id,
      name: "milna",
      description: "rasa strawberry",
      type: "makanan",
    },
  });

  const product3 = await prisma.product.create({
    data: {
      category_id: category2.id,
      warehouse_id: warehouse2.id,
      name: "celana hitam",
      description: "merek gucci",
      type: "pakaian",
    },
  });

  // Seed untuk Cart_Product
  const cartProduct = await prisma.cart_Product.create({
    data: {
      product_id: product1.id,
      cart_id: cart1.id,
      quantity: 2,
      price: 140000,
    },
  });

  const cartProduct1 = await prisma.cart_Product.create({
    data: {
      product_id: product2.id,
      cart_id: cart1.id,
      quantity: 3,
      price: 120000,
    },
  });

  // Seed untuk Product_Detail
  const productDetail1 = await prisma.product_Detail.create({
    data: {
      product_id: product1.id,
      photo:
        "https://res.cloudinary.com/dyua08mya/image/upload/v1701670086/ynwygof3appusaddu2ee.jpg",
      color: "-",
      stock: 10,
      price: 12000,
      weight: 100,
    },
  });

  const productDetail2 = await prisma.product_Detail.create({
    data: {
      product_id: product2.id,
      photo:
        "https://res.cloudinary.com/dyua08mya/image/upload/v1701670086/ynwygof3appusaddu2ee.jpg",
      color: "-",
      stock: 10,
      price: 10000,
      weight: 100,
    },
  });

  const productDetail3 = await prisma.product_Detail.create({
    data: {
      product_id: product3.id,
      photo:
        "https://res.cloudinary.com/dyua08mya/image/upload/v1701670086/ynwygof3appusaddu2ee.jpg",
      color: "black",
      stock: 5,
      price: 2500000,
      weight: 100,
    },
  });

  // Seed untuk Payment_Method
  const paymentMethod = await prisma.payment_Method.create({
    data: {
      value: "Credit Card",
    },
  });

  // Seed untuk Order
  const order1 = await prisma.order.create({
    data: {
      cart_id: cart1.id,
      address_id: address1.id,
      shipping_price: 15000,
      price: 54000,
    },
  });

  // Seed untuk Payment
  const payment1 = await prisma.payment.create({
    data: {
      order_id: order1.id,
      cart_id: cart1.id,
      payment_method_id: paymentMethod.id,
      total_price: 69000,
      status: "waiting",
    },
  });

  // Seed untuk Order_Status
  const orderStatus = await prisma.order_Status.create({
    data: {
      order_id: order1.id,
      status: "Pending",
    },
  });

  console.log("Seed berhasil dijalankan");
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
