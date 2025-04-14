"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CustomButton } from "@/features/marketing/shared/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePhoneNumber } from "../hooks/use-login-info";
import { authOtpSchema } from "../schema/auth.schema";
import { resendOTP, varifyOtp } from "../server/auth.action";
import { authOTPSchemaType } from "../types";
import ShowResponse from "./ShowResponse";

const LoginOtpForm = ({
  closeDialouge,
  isRunning,
  timeLeft,
  startCountdown,
}: {
  closeDialouge: () => void;
  startCountdown: (arg: number) => void;
  isRunning: boolean;
  timeLeft: string;
}) => {
  const router = useRouter();
  const { number } = usePhoneNumber();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const form = useForm<authOTPSchemaType>({
    resolver: zodResolver(authOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["otp-login"],
    mutationFn: varifyOtp,
    onSuccess: ({ message, error }) => {
      if (message) {
        setMessage(message);
        setTimeout(() => {
          setMessage("");
          closeDialouge();
          router.refresh();
        }, 2000);
      }
      if (error) {
        setError(error);
        setTimeout(() => {
          setError("");
          form.setValue("otp", "");
        }, 4000);
      }
    },
  });
  const resentInstance = useMutation({
    mutationKey: ["otp-resent"],
    mutationFn: resendOTP,
    onSuccess: ({ message, error }) => {
      if (message) {
        setMessage(message);
        startCountdown(2);
        setTimeout(() => {
          setMessage("");
        }, 4000);
      }
      if (error) {
        setError(error);
        setTimeout(() => {
          setError("");
          form.setValue("otp", "");
        }, 4000);
      }
    },
  });

  function onSubmit(value: authOTPSchemaType) {
    if (!message) {
      mutate({ authData: value, phoneNo: number });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-4"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mt-10">
                  {isRunning ? (
                    <div className="mb-3 flex items-center justify-center font-quickSand text-lg font-bold tracking-wider text-blue-500">
                      {timeLeft}
                    </div>
                  ) : (
                    <div className="mb-2 flex items-center">
                      <CustomButton
                        pending={resentInstance.isPending}
                        type="button"
                        onClick={() =>
                          resentInstance.mutate({ phoneNo: number })
                        }
                        variant={"ghost"}
                        className="m-auto text-blue-500"
                      >
                        Resend OTP
                      </CustomButton>
                    </div>
                  )}
                  <InputOTP
                    {...field}
                    maxLength={5}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <div className="m-auto">
                      <InputOTPGroup className="gap-2 *:rounded-md *:border *:border-gray-300">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </div>
                  </InputOTP>

                  <FormMessage className="mt-2 text-center" />
                  <div className="mt-2">
                    {message && <ShowResponse text={message} type="message" />}
                    {error && <ShowResponse text={error} type="error" />}
                  </div>
                  <div className="mt-5 flex items-center justify-center">
                    {
                      <CustomButton
                        type="submit"
                        pending={isPending}
                        variant={"signature"}
                        className="w-full rounded-full py-6"
                      >
                        Varify OTP
                      </CustomButton>
                    }
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default LoginOtpForm;
