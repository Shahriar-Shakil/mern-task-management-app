import { cookies } from "next/headers";
import { API_TASK } from "@/lib/API";
import { objectToQueryString } from "@/lib/utils";

export async function getTasks(filter: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("session")?.value;
  let query: { completed?: any } = {};
  if (filter) {
    query.completed = filter;
  }
  let url = `${API_TASK}?${objectToQueryString(query)}`;
  const res = await fetch(url, {
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
