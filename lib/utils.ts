import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
type DataPoint = { size: number; price: number };
type Model = { m: number; b: number };

const ERROR_MESSAGE =
  "An unexpected error occurred while processing your request. Please try again later.";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function showErrorToast() {
  return toast.error(ERROR_MESSAGE, {
    duration: 6000,
  });
}

export { cn, showErrorToast };
export type { DataPoint, Model };
