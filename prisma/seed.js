const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  // Seed untuk Admin
  const admin = await prisma.admin.create({
    data: {
      username: "admin",
      email: "admin@example.com",
      password: "$2a$10$1oh71YPq8WhtwpAJioIWResSYa9HOee9ncvqV/3kAQqcKNxXXdt8C",
      address: "jalan sukiem",
    },
  });

  // Seed untuk Category
  const category1 = await prisma.category.create({
    data: {
      category_name: "Pakaian Anak",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      category_name: "Mainan Anak",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      category_name: "Kereta Dorong",
    },
  });

  const category4 = await prisma.category.create({
    data: {
      category_name: "Keperluan Kamar",
    },
  });

  const category5 = await prisma.category.create({
    data: {
      category_name: "Alat Makan",
    },
  });

  // Seed untuk Warehouse
  const warehouse1 = await prisma.warehouse.create({
    data: {
      admin_id: admin.id,
      warehouse_name: "Warehouse A",
      address: "Jakarta",
      province_id: 1,
      city_id: 1,
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      admin_id: admin.id,
      warehouse_name: "Warehouse B",
      address: "Bandung",
      province_id: 1,
      city_id: 1,
    },
  });

  const warehouse3 = await prisma.warehouse.create({
    data: {
      admin_id: admin.id,
      warehouse_name: "Warehouse c",
      address: "Bekasi",
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

  const user3 = await prisma.user.create({
    data: {
      username: "Nabilah Thahirah",
      email: "Nabilahg@example.com",
      password: "$2a$10$mZE5pgOrkxnpgmecBhtPVuWZCx6IVpd8nHuileq3He4SnvFY6aUm.",
      phone: "8474773",
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: "Muti Salsabila",
      email: "MutiSalsabila@example.com",
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
      user_id: user2.id,
      address: "jalan Haji Nawi",
      postal_code: "3213",
      phone: "837273",
      city_id: 3, // Ganti dengan city_id yang sesuai
      province_id: 3, // Ganti dengan province_id yang sesuai
    },
  });
  const address3 = await prisma.address.create({
    data: {
      user_id: user3.id,
      address: "jalan pondok indah",
      postal_code: "723",
      phone: "3232",
      city_id: 4, // Ganti dengan city_id yang sesuai
      province_id: 4, // Ganti dengan province_id yang sesuai
    },
  });
  const address4 = await prisma.address.create({
    data: {
      user_id: user4.id,
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

  const cart2 = await prisma.cart.create({
    data: {
      user_id: user2.id,
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
      name: "NATURE TRAIL WOVEN DRESS",
      description: "With simple button fastening, this short playsuit is made for summer playtimes. Made from naturally-soft cotton with a stretchy waistband, it's filled with big cats and finished with a frilly flourish.",
      type: "Women",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      category_id: category1.id,
      warehouse_id: warehouse1.id,
      name: "MOTHERCARE NAVY T-SHIRT",
      description: "With the prettiest floral print, this cool, cotton dress is ready to twirl into summer days. With fluttery frilled sleeves, it's simply fastened with buttons.",
      type: "Women",
    },
  });

  const product3 = await prisma.product.create({
    data: {
      category_id: category1.id,
      warehouse_id: warehouse1.id,
      name: "DENIM DUNGAREES AND BODYSUIT SET",
      description: "Soft, natural, cotton, a gathered waist and a comfy fit makes this short-sleeved dress the perfect option for everyday wear. With a dreamy tie-dye print, this jersey dress is an easy-breezy outfit choice.",
      type: "Unisex",
    },
  });

  const product4 = await prisma.product.create({
    data: {
      category_id: category2.id,
      warehouse_id: warehouse2.id,
      name: "FISHER PRICE 3-IN-1 RAINFOREST SENSORY GYM",
      description:
        "The Fisher-Price® 3-in-1 Rainforest Sensory Gym™ grows with your baby from newborn to toddler, offering wild sensory delights along the way. Newborns can lay on the soft playmat with 6 toys hanging on the arches overhead. For tummy time, the adjustable arch can slide down to bring the toys within reach while the giraffe wedge helps support your baby as they play. Plus, the Music & Lights Sloth toy keeps playtime exciting as your baby grows from tummy time to sit-at and travel play",
      type: "Mainan - One Size",
    },
  });

  const product5 = await prisma.product.create({
    data: {
      category_id: category2.id,
      warehouse_id: warehouse2.id,
      name: "FISHER PRICE DELUXE INFANT-TO-TODDLER ROCKER",
      description:
        "Your baby has the perfect place to sit back and relax with the Fisher-PriceÂ® Infant-to-Toddler Rocker. This baby chair starts out as a soothing infant rocker or stationary seat with calming vibrations and 2 bat-at toys overhead. Then, as baby grows, remove the toy bar and convert the seat to a toddler rocking chair. The chair also features a deep, cozy seat, 2 recline positions, and machine-washable seat pad. Use from birth until child weighs 40 lb",
      type: "Mainan - One Size",
    },
  });

  const product6 = await prisma.product.create({
    data: {
      category_id: category2.id,
      warehouse_id: warehouse2.id,
      name: "MOTHERCARE WOODEN ZEBRA SHAPE SORTER",
      description:
        "Easy for little hands to hold, these bright shapes provide endless open play to constantly stretch children's imaginations.Stacking, nesting and building with the shapes is a fantastic way to build hand-to-eye coordination and spatial awareness skills. Turn the arches into bridges, tunnels or create houses for toy characters. Sorting and ordering by size is a great first, fun introduction to maths.Made from wood, this lovely toy will last for years to come",
      type: "Mainan - One Size",
    },
  });

  const product7 = await prisma.product.create({
    data: {
      category_id: category3.id,
      warehouse_id: warehouse1.id,
      name: "SILVER CROSS STROLLER CLIC",
      description: "The Nuna Trvl stroller is a stroller weighing 13.6 lbs which can be easily carried anywhere. Nuna Trvl is also designed with materials that feel luxurious and innovative, very suitable for travel and urban life.",
      type: "STROLLER - Women",
    },
  });

  const product8 = await prisma.product.create({
    data: {
      category_id: category3.id,
      warehouse_id: warehouse1.id,
      name: "NUNA TRAVEL PINE",
      description:
        "Behold the ultra compact Bugaboo Butterfly, the one second fold stroller for city and travel life. Fold and unfold the Butterfly at lightning speed and enjoy total freedom on your daily commute or weekend getaway. Itâ€™s lightweight, easy to maneuver, yet super sturdy for wherever adventure takes you and your growing baby",
      type: "STROLLER - Unisex",
    },
  });

  const product9 = await prisma.product.create({
    data: {
      category_id: category1.id,
      warehouse_id: warehouse1.id,
      name: "BUGABOO BUTTERFLY BLACK MIDNIGHT BLACK",
      description:
        "Behold the ultra compact Bugaboo Butterfly, the one second fold stroller for city and travel life. Fold and unfold the Butterfly at lightning speed and enjoy total freedom on your daily commute or weekend getaway. Itâ€™s lightweight, easy to maneuver, yet super sturdy for wherever adventure takes you and your growing baby",
      type: "STROLLER - Unisex",
    },
  });

  const product10 = await prisma.product.create({
    data: {
      category_id: category4.id,
      warehouse_id: warehouse3.id,
      name: "Baby Rovega Bedding Complete Set",
      description:
        "IZEL 3 in 1 Babycrib, a baby crib with a mattress uk 140x70 cm thick 10cm with adjustable height (there are 3 height levels newborn more than 6 months when the child is active more than 10 months when the child is taller), equipped with 2 shelves and storage 1 drawer. It is a long term investment that can be used for a long time, Izel 3in1 baby crib can be changed and extended into a toddler bedbox with a 70x180 cm mattress",
      type: "Ranjang Bayi & Balita",
    },
  });

  const product11 = await prisma.product.create({
    data: {
      category_id: category4.id,
      warehouse_id: warehouse3.id,
      name: "TUTTI BAMBINI COZEE BEDSIDE CRIB - WALNUT AND PUTTY",
      description:
        "Cozee Bedside crib is specially designed to create a bond between parents and their little ones. Can be used as a co-sleeping or stand alone crib. Innovative with a 30 second open and fold mechanism, making it easy for parents to bring this crib for traveling. Easy to store and equipped with a mesh window, cool and comfortable for your little one. Accompanied by a travel bag. The fabric lining can be removed and washed. has an incline position to help babies with phlegm and reflux. included with deluxe foam mattress",
      type: "Ranjang Bayi & Balita",
    },
  });

  const product12 = await prisma.product.create({
    data: {
      category_id: category4.id,
      warehouse_id: warehouse3.id,
      name: "Tutti Bambini Cozee Bedside Crib Bundle Oak Charcoal",
      description:
        "Suitable from birth to six months, the CoZeeï¿½ Bedside Crib has been designed to allow you to sleep next to your baby developing that special bond without sharing the same bed, as recommended by baby experts and can also be used as a standalone crib too.",
      type: "Ranjang Bayi & Balita",
    },
  });

  const product13 = await prisma.product.create({
    data: {
      category_id: category5.id,
      warehouse_id: warehouse3.id,
      name: "BEABA SILICONE SUCTION BOWL",
      description:
        "Mealtime, without the mess our Silicone Suction Plate is a mealtime essential for every family. This plate features a suction bottom, so it easily attaches to clean surfaces and helps more food to land in your little one belly instead of on the floor. made from superior quality silicone, and is BPA, Lead and Phthalate-free",
      type: "Unisex",
    },
  });

  const product14 = await prisma.product.create({
    data: {
      category_id: category5.id,
      warehouse_id: warehouse3.id,
      name: "NUBY 1PK TRITAN FLIPIT WITH STRAW OCTOPUS 400ML",
      description: "Nuby tritan 360 ball straw design allows the baby to drink at any angle!",
      type: "Minuman - Anak",
    },
  });

  const product15 = await prisma.product.create({
    data: {
      category_id: category5.id,
      warehouse_id: warehouse3.id,
      name: "YAMATOYA SUKUSUKU PLUS TABLE",
      description: "Popular they chair with slim width, is a function of the Chair series. Baby sat back, so you can adjust the position of the seat and leg color grows 10 years",
      type: "Chair",
    },
  });

  // Seed untuk Cart_Product
  const cartProduct1 = await prisma.cart_Product.create({
    data: {
      product_id: product1.id,
      cart_id: cart1.id,
      quantity: 2,
      price: 149000,
    },
  });

  const cartProduct2 = await prisma.cart_Product.create({
    data: {
      product_id: product2.id,
      cart_id: cart1.id,
      quantity: 3,
      price: 249000,
    },
  });

  // Seed untuk Product_Detail
  const productDetail1 = await prisma.product_Detail.create({
    data: {
      product_id: product1.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702208577/NATURE_TRAIL_WOVEN_DRESS_kptrwz.webp",
      color: "Cream",
      stock: 10,
      price: 149000,
      weight: 100,
    },
  });

  const productDetail2 = await prisma.product_Detail.create({
    data: {
      product_id: product2.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702208577/MOTHERCARE_NAVY_T-SHIRT_mk5qc1.webp",
      color: "Navy",
      stock: 10,
      price: 249000,
      weight: 100,
    },
  });

  const productDetail3 = await prisma.product_Detail.create({
    data: {
      product_id: product3.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702208577/DENIM_DUNGAREES_AND_BODYSUIT_SET_lyhbph.webp",
      color: "Denim",
      stock: 5,
      price: 379000,
      weight: 100,
    },
  });

  const productDetail4 = await prisma.product_Detail.create({
    data: {
      product_id: product4.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702353746/FISHER_PRICE_3-IN-1_RAINFOREST_SENSORY_GYM_wejqjc.webp",
      color: "Multi",
      stock: 3,
      price: 379000,
      weight: 300,
    },
  });

  const productDetail5 = await prisma.product_Detail.create({
    data: {
      product_id: product5.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702353746/FISHER_PRICE_DELUXE_INFANT-TO-TODDLER_ROCKER_qruc10.webp",
      color: "Grey",
      stock: 5,
      price: 779000,
      weight: 400,
    },
  });

  const productDetail6 = await prisma.product_Detail.create({
    data: {
      product_id: product6.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702353745/MOTHERCARE_WOODEN_ZEBRA_SHAPE_SORTER_fal3wm.webp",
      color: "Multi",
      stock: 5,
      price: 379000,
      weight: 100,
    },
  });

  const productDetail7 = await prisma.product_Detail.create({
    data: {
      product_id: product7.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702354862/SILVER_CROSS_STROLLER_CLIC_wemqf4.webp",
      color: "Pink",
      stock: 2,
      price: 7798000,
      weight: 2200,
    },
  });

  const productDetail8 = await prisma.product_Detail.create({
    data: {
      product_id: product8.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702354862/NUNA_TRAVEL_PINE_iprsuq.webp",
      color: "Army",
      stock: 3,
      price: 5429999,
      weight: 1600,
    },
  });

  const productDetail9 = await prisma.product_Detail.create({
    data: {
      product_id: product9.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702354862/BUGABOO_BUTTERFLY_BLACK_MIDNIGHT_BLACK_n2m8fo.webp",
      color: "Black",
      stock: 7,
      price: 9870000,
      weight: 2200,
    },
  });

  const productDetail10 = await prisma.product_Detail.create({
    data: {
      product_id: product10.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702355440/Baby_Rovega_Bedding_Complete_Set_hqsxll.webp",
      color: "White",
      stock: 5,
      price: 17797000,
      weight: 2000,
    },
  });

  const productDetail11 = await prisma.product_Detail.create({
    data: {
      product_id: product11.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702355439/Tutti_Bambini_Cozee_Bedside_Crib_Bundle_Oak_Charcoal_zzoccr.webp",
      color: "Denim",
      stock: 5,
      price: 3790000,
      weight: 900,
    },
  });

  const productDetail12 = await prisma.product_Detail.create({
    data: {
      product_id: product12.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702355438/TUTTI_BAMBINI_COZEE_BEDSIDE_CRIB_-_WALNUT_AND_PUTTY_nq9gj4.webp",
      color: "Grey",
      stock: 5,
      price: 379000,
      weight: 100,
    },
  });

  const productDetail13 = await prisma.product_Detail.create({
    data: {
      product_id: product13.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702356619/BEABA_SILICONE_SUCTION_BOWL_vnzgx3.webp",
      color: "Pink",
      stock: 5,
      price: 87000,
      weight: 100,
    },
  });

  const productDetail14 = await prisma.product_Detail.create({
    data: {
      product_id: product14.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702356618/NUBY_1PK_TRITAN_FLIPIT_WITH_STRAW_OCTOPUS_400ML_ta5jhi.webp",
      color: "Pink",
      stock: 5,
      price: 67900,
      weight: 100,
    },
  });

  const productDetail15 = await prisma.product_Detail.create({
    data: {
      product_id: product15.id,
      photo: "https://res.cloudinary.com/dyua08mya/image/upload/v1702356619/YAMATOYA_SUKUSUKU_PLUS_TABLE_mlgnvq.webp",
      color: "Brown",
      stock: 5,
      price: 1379000,
      weight: 1500,
    },
  });

  // Seed untuk Payment_Method
  const paymentMethod = await prisma.payment_Method.create({
    data: {
      value: "Transfer Bank",
    },
  });

  const paymentMethod2 = await prisma.payment_Method.create({
    data: {
      value: "QRIS",
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

  const order2 = await prisma.order.create({
    data: {
      cart_id: cart2.id,
      address_id: address1.id,
      shipping_price: 15000,
      price: 154000,
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
      upload: "https://res.cloudinary.com/dyua08mya/image/upload/v1701670086/ynwygof3appusaddu2ee.jpg",
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      order_id: order1.id,
      cart_id: cart1.id,
      payment_method_id: paymentMethod.id,
      total_price: 69000,
      status: "waiting",
      upload: "https://res.cloudinary.com/dyua08mya/image/upload/v1701670086/ynwygof3appusaddu2ee.jpg",
    },
  });

  // Seed untuk Order_Status
  const orderStatus = await prisma.order_Status.create({
    data: {
      order_id: order1.id,
      status: "Pending",
    },
  });

  const orderStatus1 = await prisma.order_Status.create({
    data: {
      order_id: order2.id,
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
