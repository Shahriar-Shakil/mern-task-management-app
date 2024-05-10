"use server";
import { cookies } from "next/headers";
import { API_TASK } from "@/lib/API";
import { TaskFormState, taskSchema } from "@/lib/definitions";

export async function createTaskAction(
  state: TaskFormState,
  formData: FormData
) {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("session")?.value;

  const validatedFields = taskSchema.safeParse({
    title: formData.get("title"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { title } = validatedFields.data;
  const response = await fetch(API_TASK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Assuming you're sending JSON data
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ title }),
  });
  const responseData = await response.json();
  return {
    data: responseData,
    resetKey: responseData._id,
  };
}
