/*
  Warnings:

  - Added the required column `mobno` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "mobno" TEXT NOT NULL,
ADD COLUMN     "output" TEXT,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "mobno" TEXT,
ADD COLUMN     "state" TEXT NOT NULL;
