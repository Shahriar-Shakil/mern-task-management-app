"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { signUpAction } from "@/actions/auth";
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
import { useToast } from "./ui/use-toast";

export function RegistrationForm() {
  const [state, action] = useFormState(signUpAction, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "error") {
      toast({
        variant: "destructive",
        title: state?.message,
      });
    }
  }, [state, toast]);
  return (
    <>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Register New Account</CardTitle>
          <CardDescription>Welcome</CardDescription>
          {state?.status === "error" && (
            <p className="text-xs text-red-600">{state?.message}</p>
          )}
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter Your username"
                />
                {state?.errors?.username && (
                  <p className="text-xs text-red-600">
                    {state.errors.username}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="Enter Your Email" />
                {state?.errors?.email && (
                  <p className="text-xs text-red-600">{state.errors.email}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                />
                {state?.errors?.password && (
                  <p className="text-xs text-red-600">
                    {state.errors.password}
                  </p>
                )}
              </div>
            </div>
            <FormSubmitButton>SignUp</FormSubmitButton>
          </form>
        </CardContent>
        <CardFooter className="flex-col divide-y-2 space-y-5 divide-blue-100">
          <div>
            <Link href="/login">Already have an account?</Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
