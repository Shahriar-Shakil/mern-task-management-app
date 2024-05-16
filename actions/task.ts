"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { API_TASK } from "@/lib/API";
import { TaskFormState, taskSchema } from "@/lib/definitions";

const cookieStore = cookies();

const accessToken = cookieStore.get("session")?.value;
export async function createTaskAction(
  state: TaskFormState,
  formData: FormData
) {
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
  revalidateTag("task");

  return {
    data: responseData,
    resetKey: responseData._id,
  };
}

export async function deleteTaskAction(id: string) {
  const response = await fetch(`${API_TASK}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Assuming you're sending JSON data
      authorization: `Bearer ${accessToken}`,
    },
  });
  const responseData = await response.json();
  revalidateTag("task");
  return responseData;
}

export async function updateTaskAction(obj: { id: string; data: {} }) {
  const raw = JSON.stringify(obj.data);
  const response = await fetch(`${API_TASK}/${obj.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json", // Assuming you're sending JSON data

      authorization: `Bearer ${accessToken}`,
    },
    body: raw,
  });
  const responseData = await response.json();
  revalidateTag("task");
  return responseData;
}
