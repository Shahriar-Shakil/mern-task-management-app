"user server";
// import { GET_USER_API } from "@/lib/API";
// // import { externalApi } from "@/lib/wretchCofig";
// import { externalApi } from "@/lib/wretchCofig";

// export async function getCurrentUser(accessToken: string | undefined) {
//   const response = await externalApi
//     .auth(`Bearer ${accessToken}`)
//     .get(GET_USER_API);
//   return response;
// }
"user server";
import { redirect } from "next/navigation";
import { GET_USER_API } from "@/lib/API";

export async function getCurrentUser(accessToken: string | undefined) {
  const response = await fetch(GET_USER_API, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data;
}
