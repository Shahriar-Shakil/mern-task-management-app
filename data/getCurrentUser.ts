"use server";
import { GET_USER_API } from "@/lib/API";

export async function getCurrentUser(accessToken?: string) {
  const response = await fetch(GET_USER_API, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data;
}
