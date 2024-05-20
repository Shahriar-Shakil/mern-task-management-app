"user server";
import { cookies } from "next/headers";
import { GET_USER_API } from "@/lib/API";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("session")?.value;
  const response = await fetch(GET_USER_API, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data;
}
