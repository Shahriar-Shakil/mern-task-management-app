import { cookies } from "next/headers";
import { API_TASK } from "@/lib/API";

export async function getTasks() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("session")?.value;
  const res = await fetch(API_TASK, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["task"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
