import React from "react";

type Props = {};

export default function InformationFilter({}: Props) {
  return (
    <div className="flex justify-between w-full text-sm leading-tight text-gray-700 align-middle   dark:text-gray-300">
      <p className="my-auto">2 items left</p>
      {/* Filer Desktop */}
      <div className="hidden my-auto gap-x-5 sm:flex">
        {["all", "active", "complete"].map((item, i) => (
          <p
            className={
              (i === 0 ? "text-blue-600 " : "") +
              "  hover:font-bold cursor-pointer capitalize"
            }
            key={item}
          >
            {item}
          </p>
        ))}
        <p className="my-auto cursor-pointer hover:font-bold">
          Clear Completed
        </p>
      </div>
    </div>
  );
}
