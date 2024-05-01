import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col  py-24">
      <div className="w-full max-w-sm mx-auto">{children}</div>
    </div>
  );
}
