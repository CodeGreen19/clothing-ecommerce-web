"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import DashboardInput from "../../../shared/DashboardInput";

import SubSecWrapper from "../shared/SubSecWrapper";
import { AddProductFormProps } from "../../types";

const ProductPricing = ({ form }: AddProductFormProps) => {
  // Watch form fields to auto-calculate final price

  const givenPrice = Number(form.watch("givenPrice")) || 0;
  const discount = Number(form.watch("discountInPercent")) || 0;

  // Auto-update final price when givenPrice or discount changes
  useEffect(() => {
    const finalPrice = givenPrice - (givenPrice * discount) / 100;
    form.setValue("finalPrice", Math.round(finalPrice).toString()); // Keep 2 decimal places
  }, [givenPrice, discount, form.setValue, form]);

  return (
    <SubSecWrapper title="Pricing">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* Original Price */}
        <FormField
          control={form.control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Price</FormLabel>
              <FormControl>
                <DashboardInput
                  type="number"
                  placeholder="Enter original price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Given Price */}
        <FormField
          control={form.control}
          name="givenPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Given Price</FormLabel>
              <FormControl>
                <DashboardInput
                  type="number"
                  placeholder="Enter given price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount Percent */}
        <FormField
          control={form.control}
          name="discountInPercent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount (%)</FormLabel>
              <FormControl>
                <DashboardInput
                  type="number"
                  placeholder="Enter discount %"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Final Price (Auto Calculated) */}
        <FormField
          control={form.control}
          name="finalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Final Price</FormLabel>
              <FormControl>
                <DashboardInput
                  type="number"
                  placeholder="Final price auto-calculated"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SubSecWrapper>
  );
};

export default ProductPricing;
