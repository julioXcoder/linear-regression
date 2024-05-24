"use client";

import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import React, { useState, useRef, ChangeEvent } from "react";
import { toast } from "sonner";
import { DataPoint, showErrorToast } from "@/lib/utils";
import { addHousePrice } from "@/app/actions";
import * as XLSX from "xlsx";

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Assuming the first row contains headers, convert array to objects
          const headers = jsonData[0] as unknown as string[];
          const rows: DataPoint[] = jsonData.slice(1).map((row: unknown) => {
            const rowData = row as unknown[];
            const rowObject: DataPoint = {} as DataPoint;
            headers.forEach((header, index) => {
              rowObject[header as keyof DataPoint] = rowData[index] as number; // Assuming all values are numbers
            });
            return rowObject;
          });

          await addHousePrice(rows);
          toast.success("House prices added successfully.", {
            duration: 6000,
          });
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        showErrorToast();
      }
    }

    // Reset file input value to allow reselecting the same file
    event.target.value = "";
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-[450px]">
      <input
        ref={fileInputRef}
        type="file"
        id="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
        onClick={handleButtonClick}
      >
        <Plus className="mr-2 h-4 w-4" />
        <p>Import file</p>
      </Button>
    </div>
  );
};

export default FileUpload;
