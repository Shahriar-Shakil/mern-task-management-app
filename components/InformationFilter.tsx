"use client";

import { useSearchParams } from "next/navigation";
import { deleteTaskAction, filterTaskAction } from "@/actions/task";
import { cn } from "@/lib/utils";

type Props = {
  tasks: any;
};

export default function InformationFilter({ tasks }: Props) {
  const completedTask = tasks?.length;
  const searchParams = useSearchParams();
  const completed = searchParams.get("completed");
  const handleFilter = async (item: any) => {
    await filterTaskAction(item);
  };
  const clearCompletedTaskHandler = async () => {
    let idsToBeDeleted = tasks
      .filter((task: any) => task.completed)
      .map((task: any) => task._id);
    await deleteTaskAction(idsToBeDeleted);
  };
  return (
    <>
      {/* Filer Desktop */}

      <div className="flex justify-between w-full text-sm leading-tight text-gray-700 align-middle dark:text-gray-300">
        <p className="my-auto">{completedTask} items left</p>
        <div className="hidden my-auto gap-x-5 sm:flex">
          {["all", "active", "complete"].map((item, i) => (
            <p
              className={cn(
                (item === completed ? "text-blue-600 " : "") ||
                  (item === "active" && completed === "false")
                  ? "text-blue-600 "
                  : "" || (item === "complete" && completed === "true")
                  ? "text-blue-600 "
                  : "",
                "hover:font-bold cursor-pointer capitalize"
              )}
              key={item}
              onClick={() => {
                handleFilter(item);
              }}
            >
              {item}
            </p>
          ))}
        </div>
        <p
          onClick={clearCompletedTaskHandler}
          className="my-auto cursor-pointer hover:font-bold"
        >
          Clear Completed
        </p>
      </div>
      {/* Filer Mobile */}

      <div className="flex justify-center items-center w-full h-16 px-6 mt-5 text-sm leading-tight text-gray-700 align-middle bg-white rounded-lg shadow appearance-none gap-x-5 sm:hidden dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300 ">
        {["all", "active", "complete"].map((item, i) => (
          <p
            className={cn(
              (item === completed ? "text-blue-600 " : "") ||
                (item === "active" && completed === "false")
                ? "text-blue-600 "
                : "" || (item === "complete" && completed === "true")
                ? "text-blue-600 "
                : "",
              "hover:font-bold cursor-pointer capitalize"
            )}
            key={item}
            onClick={() => {
              handleFilter(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </>
  );
}
