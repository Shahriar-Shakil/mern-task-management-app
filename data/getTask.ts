import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { API_TASK } from "@/lib/API";
import { authOptions } from "@/lib/auth";
import { objectToQueryString } from "@/lib/utils";

export async function getTasks(filter: string) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.accessToken;
  let query: { completed?: any } = {};
  if (filter) {
    query.completed = filter;
  }
  let url = `${API_TASK}?${objectToQueryString(query)}&sortOrder=desc`;
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
