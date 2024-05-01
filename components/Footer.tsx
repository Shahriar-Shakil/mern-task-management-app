import React from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  SunIcon,
} from "@radix-ui/react-icons";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="max-w-xs mx-auto py-5">
      <div className="flex items-center gap-2 justify-center">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <GitHubLogoIcon className="h-[2.2rem] w-[2.2rem]  " />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <LinkedInLogoIcon className="h-[2.2rem] w-[2.2rem]  " />
        </a>
      </div>
    </footer>
  );
}
