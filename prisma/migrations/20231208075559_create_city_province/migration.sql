/*
  Warnings:

  - You are about to drop the `Upload` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `created_at` on table `City` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `City` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `Province` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Province` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('accepted', 'rejected', 'waiting');

-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_payment_id_fkey";

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "status" "paymentStatus" NOT NULL,
ADD COLUMN     "upload" TEXT;

-- AlterTable
ALTER TABLE "Province" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE "Upload";
