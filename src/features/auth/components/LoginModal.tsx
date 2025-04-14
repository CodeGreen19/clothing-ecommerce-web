"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode, useRef, useState } from "react";
import GoogleLoginForm from "./GoogleLoginForm";
import LoginOtpForm from "./LoginOtpForm";
import LoginPhoneNoForm from "./LoginPhoneNoForm";
import useCountdown from "../hooks/use-coundown";

const LoginModal = ({ children }: { children: ReactNode }) => {
  const { startCountdown, isRunning, timeLeft } = useCountdown();
  const [selectedPage, setSelectedPage] = useState<"signIn" | "otp">("signIn");
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const shiftToOTPform = () => {
    setSelectedPage("otp");
  };
  const closeDialouge = () => {
    closeRef.current?.click();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <div className="h-[300px] overflow-clip">
              <div
                className={cn(
                  "my-10 h-full px-10 transition-all duration-700",
                  selectedPage === "signIn"
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0",
                )}
              >
                <GoogleLoginForm />
                <div className="relative my-5 h-[1px] w-full bg-gray-300">
                  <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm">
                    OR
                  </h1>
                </div>
                <LoginPhoneNoForm
                  startCountdown={startCountdown}
                  shiftToOTPform={shiftToOTPform}
                />
              </div>
              <div
                className={cn(
                  "my-10 h-full px-10 transition-all delay-500 duration-700",
                  selectedPage === "signIn"
                    ? "translate-y-0 opacity-0"
                    : "-translate-y-full opacity-100",
                )}
              >
                <LoginOtpForm
                  startCountdown={startCountdown}
                  isRunning={isRunning}
                  timeLeft={timeLeft}
                  closeDialouge={closeDialouge}
                />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
        <DialogClose className="hidden" ref={closeRef}></DialogClose>
      </Dialog>
    </div>
  );
};

export default LoginModal;
