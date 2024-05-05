import React from "react";

type Props = {};

export default function InputArea({}: Props) {
  return (
    <div
      id="#input"
      className="flex w-full h-16 px-6 my-12 text-lg leading-tight text-gray-700 align-middle bg-white rounded shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline"
    >
      <div>
        <img src="/images/circle.svg" alt="LogoCentang" className="mt-5 mr-6" />
      </div>

      <form className="flex-1">
        <input
          className="w-full h-16 border-none input dark:bg-input-dark dark:text-gray-300"
          id="username"
          type="text"
          placeholder="What to do ?"
        />
      </form>
    </div>
  );
}
