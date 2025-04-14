"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CustomButton } from "@/features/marketing/shared/CustomButton";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { usePhoneNumber } from "../hooks/use-login-info";
import { authPhoneNoSchema } from "../schema/auth.schema";
import { loginWithPhoneNo } from "../server/auth.action";
import { authPhoneSchemaType } from "../types";
import ShowResponse from "./ShowResponse";

export default function LoginPhoneNoForm({
  shiftToOTPform,
  startCountdown,
}: {
  shiftToOTPform: () => void;
  startCountdown: (arg: number) => void;
}) {
  const { setNumber } = usePhoneNumber();
  const [message, setMessage] = useState<string>("");
  const form = useForm<authPhoneSchemaType>({
    resolver: zodResolver(authPhoneNoSchema),
    defaultValues: {
      phoneNo: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["phone-login"],
    mutationFn: loginWithPhoneNo,
    onSuccess: ({ message }) => {
      if (message) setMessage(message);
      setNumber(form.getValues("phoneNo"));
      setTimeout(() => {
        startCountdown(2);
        shiftToOTPform();
      }, 2000);
    },
  });

  function onSubmit(values: authPhoneSchemaType) {
    if (!message) {
      mutate(values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-4"
      >
        {message && <ShowResponse text={message} type="message" />}
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  placeholder="Phone number"
                  className={cn(
                    "rounded-full px-5 py-6",
                    fieldState.error &&
                      "ring-red-500 focus-visible:ring-red-500",
                  )}
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          pending={isPending}
          variant={"signature"}
          className="w-full rounded-full py-6"
        >
          Login With OTP
        </CustomButton>
      </form>
    </Form>
  );
}
