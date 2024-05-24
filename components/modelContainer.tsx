"use client";

import LinearRegressionChart from "@/components/linearRegressionChart";
import { columns } from "@/components/table/columns";
import DataTable from "@/components/table/dataTable";
import { HousePrice } from "@prisma/client";
import { Model, DataPoint } from "@/lib/utils";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import ModelForm from "./modelForm";

interface Props {
  data: HousePrice[];
}

const ModelContainer = ({ data }: Props) => {
  const [model, setModel] = useState<Model | null>(null);
  const [predictedPoint, setPredictedPoint] = useState<DataPoint | null>(null);

  const trainLinearRegression = (data: DataPoint[]): void => {
    const n = data.length;
    if (n <= 1) {
      toast.error(
        "Insufficient data for training. There should be at least 2 data points.",
        { duration: 6000 }
      );
      return;
    }

    let xSum = 0;
    let ySum = 0;
    let xySum = 0;
    let xSquaredSum = 0;

    for (let i = 0; i < n; i++) {
      const { size, price } = data[i];
      xSum += size;
      ySum += price;
      xySum += size * price;
      xSquaredSum += size ** 2;
    }

    const numerator = n * xySum - xSum * ySum;
    const denominator = n * xSquaredSum - xSum ** 2;

    if (denominator === 0) {
      toast.error(
        "Denominator is zero. Unable to compute regression parameters.",
        { duration: 6000 }
      );
      return;
    }

    const m = numerator / denominator;
    const b = ySum / n - m * (xSum / n);

    setModel({ m, b });
  };

  const handleSetSize = (size: number, model: Model) => {
    const price = model.m * size + model.b;

    setPredictedPoint({ price, size });
  };

  return (
    <div className="container">
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
              predictedPoint={predictedPoint}
              data={data}
            />
          </CardContent>
        </Card>
        {data.length > 1 && (
          <>
            <div>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Predict price
              </h2>
              {model && (
                <>
                  <ModelForm onSetSize={handleSetSize} model={model} />
                  {predictedPoint && (
                    <div>The price is: {predictedPoint.price} Tzs.</div>
                  )}
                </>
              )}
            </div>
            <div>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Train Model
              </h2>
              <Button onClick={() => trainLinearRegression(data)}>Train</Button>
              {model && (
                <div className="flex my-2 gap-2">
                  <span>m:{model.m}</span>
                  <span>b:{model.b}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModelContainer;
