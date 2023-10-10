/* eslint-disable camelcase */

import type { Component } from "@/lib/utils/component";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils/style/class";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/components/ui/theme-provider";
import { Toaster } from "@/lib/components/ui/toaster";
import { UserProvider } from "@/lib/utils/contexts/user-provider";

const os = Open_Sans({ subsets: ["latin"] });

export { metadata } from "../config/metadata";

const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          <body className={cn("bg-white dark:bg-zinc-950 p-6 md:p-10 flex justify-center items-center flex-col", os)}>
            {children}
            <Toaster />
          </body>
        </UserProvider>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;