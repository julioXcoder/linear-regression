"use server";

import prisma from "@/prisma/db";
import { DataPoint } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getHousePrices() {
  const data = await prisma.housePrice.findMany();

  return data;
}

export async function addHousePrice(dataPoints: DataPoint[]) {
  const newData = await filterExistingSizes(dataPoints);

  const data = newData.map((dataPoint) => ({
    price: dataPoint.price,
    size: dataPoint.size,
  }));

  await prisma.housePrice.createMany({
    data,
  });

  revalidatePath("/");
}

async function filterExistingSizes(data: DataPoint[]): Promise<DataPoint[]> {
  const existingSizes = await prisma.housePrice.findMany({
    select: { size: true },
  });

  const newData = data.filter((dataPoint) => {
    return !existingSizes.some(
      (existingSize) => existingSize.size === dataPoint.size
    );
  });

  return newData;
}
