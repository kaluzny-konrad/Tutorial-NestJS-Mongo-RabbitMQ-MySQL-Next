"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Icons } from "../icons/Icons";

type Props = {};

export default function GoogleLoginButton({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast(
        "There was a problem logging in with Google. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"flex justify-center"} data-testid="google-login-button">
      <Button
        aria-label="google log in button"
        onClick={loginWithGoogle}
        isLoading={isLoading}
        color="primary"
        variant="ghost"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
}
