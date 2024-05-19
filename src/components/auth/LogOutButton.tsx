"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const LogOutButton = () => {
  return <Button onClick={() => signOut()}>Log out</Button>;
};
