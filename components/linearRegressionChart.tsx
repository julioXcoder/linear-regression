"use client";

import React from "react";
import { HousePrice } from "@prisma/client";
import { DataPoint } from "@/lib/utils";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ReferenceLine,
} from "recharts";

// Sample data points
// const data = [
//   { x: 1, y: 2 },
//   { x: 2, y: 3 },
//   { x: 3, y: 5 },
//   { x: 4, y: 7 },
//   { x: 5, y: 11 },
// ];

interface Props {
  predictedPoint: DataPoint | null;
  data: HousePrice[];
}

const LinearRegressionChart = ({ predictedPoint, data }: Props) => (
  <ScatterChart
    width={600}
    height={400}
    margin={{ top: 20, right: 10, bottom: 30, left: 30 }}
  >
    <CartesianGrid />
    <XAxis
      type="number"
      dataKey="size"
      name="X Axis"
      label={{
        key: "xAxisLabel",
        value: "house size",
        position: "bottom",
      }}
    />
    <YAxis
      type="number"
      dataKey="price"
      name="Y Axis"
      // label={{
      //   key: "yAxisLabel",
      //   value: "house size",
      //   position: "bottom",
      // }}
    />
    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
    <Scatter name="Data Points" data={data} fill="#8884d8" />
    {predictedPoint && (
      <>
        <ReferenceLine x={predictedPoint.size} stroke="green" />
        <ReferenceLine y={predictedPoint.price} stroke="green" />
        <Scatter name="Predicted Point" data={[predictedPoint]} fill="red" />
      </>
    )}
  </ScatterChart>
);

export default LinearRegressionChart;
