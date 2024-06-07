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
        <TooltipTrigger onClick={() => setIsDarkMode((prev) => !prev)}>
          {isDarkMode ? <Icons.moon /> : <Icons.sun />}
        </TooltipTrigger>
        <TooltipContent>
          {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
