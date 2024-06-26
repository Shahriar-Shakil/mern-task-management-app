"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSubmitButton from "./FormSubmitButton";

export function LoginForm() {
  const router = useRouter();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleEmailLogin = async (values: any) => {
    try {
      const res = await signIn("email", {
        ...values,
        redirect: false,
      });
      if (!res?.error) {
        router.replace("/");
      }
    } catch (error) {
      console.log("error on signIn", error);
    } finally {
    }
  };
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>To Explore your Tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitEmail(handleEmailLogin)} autoComplete="off">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter Your Email"
                {...registerEmail("email")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                {...registerEmail("password")}
              />
            </div>
          </div>
          <FormSubmitButton loading={isSubmitting}>Login</FormSubmitButton>
        </form>
      </CardContent>
      <CardFooter className="flex-col divide-y-2 space-y-5 divide-blue-100">
        <div>
          <Link href="/registration">Create an account</Link>
        </div>
      </CardFooter>
    </Card>
  );
}
