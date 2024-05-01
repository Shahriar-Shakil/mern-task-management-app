import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="flex  flex-col  py-10">
      <div className="w-full max-w-sm mx-auto space-y-3">
        <div className=" flex items-center justify-between px-3 md:px-0">
          <h2 className="tracking-wider">A Simple TODO App</h2>
          <ModeToggle />
        </div>
        <Separator />
        {children}
      </div>
    </div>
  );
}
