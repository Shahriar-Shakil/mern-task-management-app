"use client";

import { startTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskAction } from "@/actions/task";
import { useTodoContext } from "@/context/TodoContext";
import { taskSchema } from "@/lib/definitions";
import { toast } from "./ui/use-toast";

type Props = {};

export default function InputArea({}: Props) {
  const { setOptimisticTodo } = useTodoContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(taskSchema), // Apply the zodResolver
  });
  let tempIds = 1;
  const onSubmit = async (value: any) => {
    startTransition(() => {
      setOptimisticTodo({ action: "add", todo: { ...value, _id: tempIds++ } });
    });
    await createTaskAction(value.title);
    reset();
  };

  useEffect(() => {
    if (errors?.title) {
      toast({
        variant: "destructive",
        title: errors?.title?.message?.toString(),
      });
    }
  }, [errors, toast]);

  return (
    <div
      id="#input"
      className="flex w-full h-16 px-6 my-12 text-lg leading-tight text-gray-700 align-middle bg-white rounded shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline"
    >
      <div>
        <img src="/images/circle.svg" alt="LogoCentang" className="mt-5 mr-6" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
        <input
          {...register("title")}
          className="w-full h-16 border-none input dark:bg-input-dark dark:text-gray-300"
          id="title"
          type="text"
          placeholder="What to do ?"
        />
        {/* {errors.title && (
          <p className="text-red-500">{errors.title?.message || ""}</p>
        )} */}
      </form>
    </div>
  );
}
