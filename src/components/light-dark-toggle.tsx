"use client";

import { useState } from "react";
import { Icons } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function LightDarkToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            setIsDarkMode((prev) => !prev);
            // this is ok as the document tag is rendered as a server component
            // alternative is to use a context to pass the dark mode state
            document.body.classList.toggle("dark");
          }}
        >
          {isDarkMode ? <Icons.Moon /> : <Icons.Sun />}
        </TooltipTrigger>
        <TooltipContent>
          {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
