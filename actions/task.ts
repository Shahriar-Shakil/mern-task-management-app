"use server";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { API_TASK } from "@/lib/API";
import { TaskFormState, taskSchema } from "@/lib/definitions";

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
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.accessToken;
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

export async function deleteTaskAction(ids: string[]) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.accessToken;
  const response = await fetch(`${API_TASK}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Assuming you're sending JSON data
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(ids),
  });
  const responseData = await response.json();
  revalidateTag("task");
  return responseData;
}

export async function updateTaskAction(obj: { id: string; data: {} }) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user?.accessToken;
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

export async function filterTaskAction(item: string) {
  if (item === "active") {
    redirect("/?completed=false");
  }
  if (item === "complete") {
    redirect("/?completed=true");
  }
  if (item === "all") {
    redirect("/?completed=all");
  }
}
