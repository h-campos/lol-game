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
      variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 transition-colors text-neutral-950 dark:text-neutral-50" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 transition-colors text-neutral-950 dark:text-neutral-50" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};