import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  tasks: any;
};

export default function InformationFilter({ tasks }: Props) {
  const completedTask = tasks?.filter((item: any) => !item.completed).length;

  return (
    <div className="flex justify-between w-full text-sm leading-tight text-gray-700 align-middle dark:text-gray-300">
      <p className="my-auto">{completedTask} items left</p>
      {/* Filer Desktop */}
      <div className="hidden my-auto gap-x-5 sm:flex">
        {["all", "active", "complete"].map((item, i) => (
          <Link
            href={{
              pathname: "/",
              query: { completed: item },
            }}
            className={
              (i === 0 ? "text-blue-600 " : "") +
              "  hover:font-bold cursor-pointer capitalize"
            }
            key={item}
            // onClick={() => handleFilter(item)}
          >
            {item}
          </Link>
        ))}
        <p className="my-auto cursor-pointer hover:font-bold">
          Clear Completed
        </p>
      </div>
    </div>
  );
}
