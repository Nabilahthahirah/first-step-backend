-- Migration script to create City and Province tables
CREATE TABLE "City" (
  "id" INTEGER NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "province_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Province" (
  "id" INTEGER NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- AlterTable
-- Add province_id columns
ALTER TABLE "Address"
ADD COLUMN "province_id" INTEGER NOT NULL;

-- Change the column in table address name from city to city_id
ALTER TABLE "Address" DROP COLUMN "city",
ADD COLUMN "city_id" INTEGER NOT NULL;

-- Change the column in table warehouse name from address to address_id
ALTER TABLE "Warehouse"
ADD COLUMN "province_id" INTEGER NOT NULL,
ADD COLUMN "city_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
