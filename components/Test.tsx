"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

type Props = {};

export default function Test({}: Props) {
  const session = useSession();
  console.log(session);
  return <div></div>;
}
