"use client";

import React, { useState } from "react";
import BillingsForm from "./BillingsForm";
import CheckoutUI from "./CheckoutInfo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCheckoutInfo, placeOrder } from "../server/checkout.action";
import { useForm } from "react-hook-form";
import {
  CheckoutFormSchemaType,
  CheckoutInfoType,
  CheckoutMethodType,
} from "../types";
import { checkoutFormSchema } from "../schema/checkout.schema";
import { useLoingUserInfo } from "@/features/auth/hooks/use-login-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { env } from "@/data/env/client";
import { handleSuccess } from "@/lib/helper";

const CheckoutPage = () => {
  const qc = useQueryClient();
  const { email, number } = useLoingUserInfo();
  const [shipping, setShipping] = useState<"inside" | "outside">("outside");
  const [payment, setPayment] =
    useState<CheckoutMethodType>("Cash on delivery");
  const { data, isPending } = useQuery({
    queryKey: ["checkout_info"],
    queryFn: async () => await getCheckoutInfo(),
  });
  // form
  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      address: "",
      orderNote: "",
      email: email,
      phoneNo: number,
    },
  });

  // total amount
  const insideDhakaAmount = Number(
    env.NEXT_PUBLIC_INSIDE_DHAKA_DELEVERY_AMOUNT,
  );
  const outsideDhakaAmount = Number(
    env.NEXT_PUBLIC_OUTSIDE_DHAKA_DELEVERY_AMOUNT,
  );

  const shippingCost =
    shipping === "outside" ? outsideDhakaAmount : insideDhakaAmount;
  const baseAmount = data?.totalAmount ?? 0;
  const totalAmount = baseAmount + shippingCost;

  // mutations

  const { mutate, isPending: submit_pending } = useMutation({
    mutationKey: ["placeOrder"],
    mutationFn: placeOrder,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, [""]);
    },
  });
  // submit
  const onSubmit = (value: CheckoutFormSchemaType) => {
    const info: CheckoutInfoType = {
      name: value.fullName,
      phoneNo: value.phoneNo,
      district: value.district,
      area: value.area,
      address: value.address,
      email: value.email,
      note: value.orderNote,
      delevery: shipping,
      method: payment,
      totalAmount: totalAmount,
    };
    mutate(info);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto">
        <div className="min-h-screen">
          <div className="h-32 bg-pink-100">banner</div>
          <div className="container m-auto grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-6 py-10">
              <BillingsForm form={form} />
            </div>
            <div>
              <CheckoutUI
                shipping={shipping}
                setShipping={setShipping}
                payment={payment}
                setPayment={setPayment}
                amount={data?.totalAmount}
                isPending={isPending}
                submitPending={submit_pending}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutPage;
