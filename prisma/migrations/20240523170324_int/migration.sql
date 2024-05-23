-- CreateTable
CREATE TABLE "housePrice" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "housePrice_pkey" PRIMARY KEY ("id")
);
