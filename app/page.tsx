// import { useEffect, useState } from "react";
// import { DataPoint, trainLinearRegression, predictPrice, Model } from "./utils";
// import { HousePriceTable } from "@/components/housePriceTable";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import ModelContainer from "@/components/modelContainer";
import { getHousePrices } from "./actions";

export default async function Home() {
  const data = await getHousePrices();

  // const [model, setModel] = useState<Model | null>(null);
  // const [prediction, setPrediction] = useState<number | null>(null);

  // useEffect(() => {
  //   const initializeModel = async () => {
  //     const data: DataPoint[] = await loadCSV("/data/house_data.csv");
  //     const trainedModel = trainLinearRegression(data);
  //     setModel(trainedModel);
  //   };

  //   initializeModel();
  // }, []);

  // const handlePredict = (size: number) => {
  //   if (model) {
  //     const predictedPrice = predictPrice(model, size);
  //     setPrediction(predictedPrice);
  //   }
  // };

  return (
    <div className="">
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Linear Regression
          </h2>
        </div>
      </nav>
      <ModelContainer data={data} />
    </div>
  );
}
