import { GET_USER_API } from "@/lib/API";

export async function getCurrentUser(accessToken: string | undefined) {
  const response = await fetch(GET_USER_API, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  const data = response.json();

  return data;
}
