import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import SubSecWrapper from "../shared/SubSecWrapper";
import { useEffect } from "react";
import { AddProductFormProps } from "../../types";
import {
  ALL_PRODUCTS_CATEGORY_WITH_SUBCATEGORY,
  GENDERS,
} from "@/constants/dashboard";

const CategoryBox = ({ form }: AddProductFormProps) => {
  const selectedCategory = form.watch("category");

  useEffect(() => {
    return () => form.setValue("category", "");
  }, [form]);

  return (
    <SubSecWrapper title="Product Category">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select category </FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(e) => {
                  field.onChange(e);
                  form.setValue("subCategory", "");
                  form.setValue("material", "");
                }}
              >
                <SelectTrigger className="w-full border-none py-4">
                  <SelectValue placeholder="select one" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_PRODUCTS_CATEGORY_WITH_SUBCATEGORY.map((item) => (
                    <SelectItem key={item.category} value={item.category}>
                      {item.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid gap-2 md:grid-cols-2">
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub category</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(e) => field.onChange(e)}
                >
                  <SelectTrigger className="w-full border-none py-4">
                    <SelectValue placeholder="select one" />
                  </SelectTrigger>
                  {ALL_PRODUCTS_CATEGORY_WITH_SUBCATEGORY.map((item) => {
                    if (item.category === selectedCategory) {
                      return (
                        <SelectContent key={item.category}>
                          {item.subcategories.map((info) => (
                            <SelectItem key={info} value={info}>
                              {info}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      );
                    }
                  })}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Materials</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(e) => field.onChange(e)}
                >
                  <SelectTrigger className="w-full border-none py-4">
                    <SelectValue placeholder="select one" />
                  </SelectTrigger>
                  {ALL_PRODUCTS_CATEGORY_WITH_SUBCATEGORY.map((item) => {
                    if (item.category === selectedCategory) {
                      return (
                        <SelectContent key={item.category}>
                          {item.materials.map((info) => (
                            <SelectItem key={info} value={info}>
                              {info}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      );
                    }
                  })}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Genders</FormLabel>
            <h3 className="text-xs text-slate-500">Pick gender</h3>
            <FormControl>
              <ul className="flex flex-wrap gap-2">
                {GENDERS.map((item) => {
                  const isSelected = field.value === item;
                  return (
                    <li
                      key={item}
                      className={cn(
                        "flex h-12 flex-none cursor-pointer items-center justify-center gap-2 rounded p-3 text-sm transition-colors lg:my-0",

                        "bg-stone-200/50",
                      )}
                      onClick={() => field.onChange(item)}
                    >
                      <span
                        className={cn(
                          "block size-4 rounded-full bg-pink-500 transition-all",
                          !isSelected
                            ? "bg-stone-600"
                            : "bg-pink-600 ring-1 ring-pink-600 ring-offset-1",
                        )}
                      ></span>
                      <span> {item}</span>
                    </li>
                  );
                })}
              </ul>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </SubSecWrapper>
  );
};

export default CategoryBox;
