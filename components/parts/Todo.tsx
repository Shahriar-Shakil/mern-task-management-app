import React from "react";
import InputArea from "../InputArea";
import { ModeToggle } from "../ModeToggle";

type Props = {};

export default function Todo({}: Props) {
  return (
    <div className="relative z-10 flex h-auto max-w-xl px-10 mx-auto bg-yellow-3000 md:mx-auto">
      <div className="w-full mt-20 text-left ">
        <div className="flex justify-between align-middle">
          <h1 className="text-4xl font-bold text-white">T O D O</h1>
          <ModeToggle />
        </div>
        {/* Input */}
        <InputArea />
      </div>
    </div>
  );
}
