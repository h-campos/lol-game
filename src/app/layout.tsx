/* eslint-disable camelcase */

import type { Component } from "@/lib/utils/component";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils/style/class";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/components/ui/theme-provider";

const os = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOL GAMES",
  description: "Lot of games around League of Legends"
};

const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body className={cn("bg-white dark:bg-zinc-950 p-10 flex justify-center items-center", os)}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;