"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/auth";
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

export function LoginForm() {
  const [state, action] = useFormState(loginAction, undefined);
  console.log(state);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.errors) {
      toast({
        variant: "destructive",
        title: "errors",
      });
    }
  }, [state, toast]);
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>To Explore your Tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} autoComplete="off">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Enter Your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter Your Password"
              />
            </div>
          </div>
          <FormSubmitButton>Login</FormSubmitButton>
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
