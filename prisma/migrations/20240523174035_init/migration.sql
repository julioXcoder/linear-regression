/*
  Warnings:

  - You are about to drop the `housePrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "housePrice";

-- CreateTable
CREATE TABLE "HousePrice" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "HousePrice_pkey" PRIMARY KEY ("id")
);
