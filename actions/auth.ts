"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_API, REGISTRATION_API } from "@/lib/API";
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "@/lib/definitions";

export async function loginAction(sate: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    console.log("error");
  }
  return await getAccessToken({ email, password });
}

export async function getAccessToken({
  email,
  password,
}: {
  email: any;
  password: any;
}) {
  const response = await fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Assuming you're sending JSON data
    },
    body: JSON.stringify({ email, password }),
  });
  const responseData = await response.json();

  return responseData;
}

export async function signUpAction(sate: FormState, formData: any) {
  //1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // 2. Prepare data for insertion into database
  const { username, email, password } = validatedFields.data;
  //3. make a post request to create User
  const response = await fetch(REGISTRATION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Assuming you're sending JSON data
    },
    body: JSON.stringify({ username, email, password }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    return {
      status: "error",
      message:
        responseData.message ||
        "An error occurred while creating your account.",
    };
  }
  if (responseData?.email) {
    await getAccessToken({ email: responseData?.email, password });
  }
}
