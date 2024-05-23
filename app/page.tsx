// import { useEffect, useState } from "react";
// import { DataPoint, trainLinearRegression, predictPrice, Model } from "./utils";
// import { HousePriceTable } from "@/components/housePriceTable";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import LinearRegressionChart from "@/components/linearRegressionChart";
import { columns } from "@/components/table/columns";
import DataTable from "@/components/table/dataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHousePrices } from "./actions";
import FileUpload from "@/components/fileUpload";

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
    <div className="container my-14">
      {/* <h1>House Price Prediction</h1>
      <button onClick={() => handlePredict(1500)}>
        Predict price for 1500 sqft
      </button>
      {prediction !== null && <p>Predicted Price: ${prediction.toFixed(2)}</p>} */}

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <DataTable columns={columns} data={data} />
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Linear Regression Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <LinearRegressionChart
              data={data}
              predictedPoint={{ id: 2, price: 5, size: 3 }}
            />
          </CardContent>
        </Card>
      </div>
      <FileUpload />
    </div>
  );
}
