// utils/dataLoader.ts

export type DataPoint = { size: number; price: number };

export type Model = { m: number; b: number };

export const trainLinearRegression = (data: DataPoint[]): Model => {
  const n = data.length;
  if (n <= 1) {
    throw new Error(
      "Insufficient data for training. There should be at least 2 data points."
    );
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
    throw new Error(
      "Denominator is zero. Unable to compute regression parameters."
    );
  }

  const m = numerator / denominator;
  const b = ySum / n - m * (xSum / n);

  return { m, b };
};

export const predictPrice = (model: Model, size: number): number => {
  return model.m * size + model.b;
};
