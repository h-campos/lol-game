/* eslint-disable max-len */
"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/lib/components/ui/button";
import type { ReactElement } from "react";

export const ToggleTheme = (): ReactElement => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="sm:absolute sm:top-4 sm:right-4 mt-3 mr-3 sm:mt-0 sm:mr-0"
      variant="default" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};