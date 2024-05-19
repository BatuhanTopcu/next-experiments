"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return <Button onClick={() => signIn("github")}>Login with GitHub</Button>;
};
