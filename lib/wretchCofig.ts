"use server";
// import { cookies } from "next/headers";
import wretch from "wretch";
import { BASE_URL } from "./API";

// const cookieStore = cookies();
// const token = cookieStore.get("session")?.value;
export const externalApi = wretch(BASE_URL).resolve((r) => r.json());
