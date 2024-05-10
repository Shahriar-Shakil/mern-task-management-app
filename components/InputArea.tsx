"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { createTaskAction } from "@/actions/task";
import { toast } from "./ui/use-toast";

type Props = {};

export default function InputArea({}: Props) {
  const [state, action] = useFormState(createTaskAction, undefined);
  console.log(state);
  useEffect(() => {
    if (state?.errors) {
      toast({
        variant: "destructive",
        title: state?.errors.title?.[0],
      });
    }
  }, [state, toast]);
  return (
    <div
      id="#input"
      className="flex w-full h-16 px-6 my-12 text-lg leading-tight text-gray-700 align-middle bg-white rounded shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline"
    >
      <div>
        <img src="/images/circle.svg" alt="LogoCentang" className="mt-5 mr-6" />
      </div>

      <form action={action} key={state?.resetKey} className="flex-1">
        <input
          className="w-full h-16 border-none input dark:bg-input-dark dark:text-gray-300"
          id="title"
          name="title"
          type="text"
          placeholder="What to do ?"
        />
      </form>
    </div>
  );
}
