import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .trim(),
});
export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long" })
    .trim(),
});

// task schema
export const taskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .trim(),
});
export type TaskFormState =
  | {
      errors?: {
        title?: string[];
      };
      message?: string;
    }
  | undefined
  | any;
