"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

import { totalStockHelper } from "@/features/dashboard/products/helpers/helper";
import { ProductSchemaType, SizeColorStockAndImagesType } from "../../../types";
import { UseFormReturn } from "react-hook-form";

interface SizeStockColorTableProps {
  form: UseFormReturn<ProductSchemaType>;
  asserts: SizeColorStockAndImagesType[];
}

export default function ShowFinalTable({
  form,
  asserts: data,
}: SizeStockColorTableProps) {
  // Calculate total stock
  const totalStock = totalStockHelper(data);

  useEffect(() => {
    if (totalStock) {
      form.setValue("totalStock", totalStock);
    }
  }, [totalStock, form]);

  if (totalStock === 0) {
    return (
      <div className="my-2 text-sm text-gray-400">No asserts is selected !</div>
    );
  }

  return (
    totalStock !== 0 && (
      <Card className="mt-2 border-none shadow-none">
        <h2 className="mb-4 text-lg font-semibold">
          Size, Color, Stock & Images
        </h2>
        <div className="overflow-x-auto">
          <Table className="w-full border-collapse">
            {/* Table Header */}
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-1/6 text-left">Size</TableHead>
                <TableHead className="w-1/4 text-left">Color</TableHead>
                <TableHead className="w-1/6 text-left">Stock</TableHead>
                <TableHead className="w-1/6 text-left">Images</TableHead>
                <TableHead className="w-1/6 text-left">Stocks</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data &&
                data.map((sizeItem, sizeIndex) => {
                  const subtotalStock = sizeItem.otherInfo.reduce(
                    (sum, colorItem) => sum + parseInt(colorItem.stock),
                    0,
                  );

                  return (
                    <React.Fragment key={sizeIndex}>
                      {sizeItem.otherInfo.map((colorItem, colorIndex) => (
                        <TableRow
                          key={`${sizeIndex}-${colorIndex}`}
                          className="border-b border-l border-r"
                        >
                          {/* Show size only in the first row of each size group */}
                          {colorIndex === 0 ? (
                            <TableCell
                              rowSpan={sizeItem.otherInfo.length}
                              className="border-r font-medium"
                            >
                              {sizeItem.size}
                            </TableCell>
                          ) : null}

                          {/* Color Cell */}
                          <TableCell className="flex items-center gap-2">
                            <div
                              className={`size-3 rounded-full ${colorItem.tailwind}`}
                              style={{ backgroundColor: colorItem.tailwind }}
                            />
                            {colorItem.color}
                          </TableCell>

                          {/* Stock */}
                          <TableCell>{colorItem.stock}</TableCell>

                          {/* Image Count */}
                          <TableCell>{colorItem.imageArr.length}</TableCell>

                          {/* Show subtotal only once per size group */}
                          {colorIndex === 0 ? (
                            <TableCell
                              rowSpan={sizeItem.otherInfo.length}
                              className="border-l font-bold"
                            >
                              {subtotalStock}
                            </TableCell>
                          ) : null}
                        </TableRow>
                      ))}
                    </React.Fragment>
                  );
                })}

              {/* Total Stock Row */}
              <TableRow className="font-bold">
                <TableCell colSpan={4} className="text-right">
                  Total Stock
                </TableCell>
                <TableCell>{totalStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    )
  );
}
