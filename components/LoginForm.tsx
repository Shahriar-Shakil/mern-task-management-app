import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LoginForm() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>To Explore your Tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter Your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col divide-y-2 space-y-5 divide-blue-100">
        <Button className="w-full">Login</Button>

        <div>
          <Link href="/registration">Create an account</Link>
        </div>
      </CardFooter>
    </Card>
  );
}
