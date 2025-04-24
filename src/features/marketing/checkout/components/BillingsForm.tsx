"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

// json file

import { useLoingUserInfo } from "@/features/auth/hooks/use-login-info";
import { Fragment, useEffect } from "react";
import districts from "../../../../../public/json/districts.json";
import thanas from "../../../../../public/json/thanas.json";
import { CheckoutFormSchemaType } from "../types";

export default function BillingsForm({
  form,
}: {
  form: UseFormReturn<CheckoutFormSchemaType>;
}) {
  const { email, number } = useLoingUserInfo();
  const district = form.watch("district");

  // thana based on district
  const filteredThana = (distict: string) => {
    const id = districts.filter((info) => info.name === distict)[0].id;
    const thanasInfo = thanas.filter((item) => item.district_id === id);
    return thanasInfo;
  };

  useEffect(() => {
    if (email) {
      form.setValue("email", email);
    }
    if (number) {
      form.setValue("phoneNo", number);
    }
  }, [email, number, form]);

  return (
    <Fragment>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    type=""
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6">
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No.</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone no." type="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {district &&
                      filteredThana(district).map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" type="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter you email (optional)"
                    type=""
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="orderNote"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Order Note (optional)"
                className="resize-none"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </Fragment>
  );
}
