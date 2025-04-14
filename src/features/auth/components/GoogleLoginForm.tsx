"use client";
import { Button } from "@/components/ui/button";
import { LoginWithGoogle } from "../server/auth.action";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginForm() {
  return (
    <form action={LoginWithGoogle}>
      <Button
        type="submit"
        className="w-full rounded-full py-6 shadow-sm"
        variant={"outline"}
      >
        <FcGoogle />
        <span>Signin with Google</span>
      </Button>
    </form>
  );
}
