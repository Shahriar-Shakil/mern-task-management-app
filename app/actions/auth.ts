"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_API } from "@/lib/API";

export async function loginAction(formData: FormData) {
  const email = formData.getAll("email");
  const password = formData.get("password");
  console.log(LOGIN_API);
  const response = await fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Assuming you're sending JSON data
    },
    body: JSON.stringify({ email, password }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Network response was not ok");
  }
  cookies().set("accessToken", responseData.accessToken);
  redirect("/");
}
