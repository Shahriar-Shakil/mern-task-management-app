"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    const result = await signUpAction({ ...data, username: data.name });
    console.log(result);
    if (result._id) {
      signIn("email", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });
    }
    if (result.status === "error") {
      toast({
        variant: "destructive",
        title: result?.message?.toString(),
      });
    }
  };
  return (
    <>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Register New Account</CardTitle>
          <CardDescription>Welcome</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name", { value: "" })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email")}
                  placeholder="Enter Your Email"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter Your Password"
                />
              </div>
            </div>
            <FormSubmitButton loading={isSubmitting}>SignUp</FormSubmitButton>
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
