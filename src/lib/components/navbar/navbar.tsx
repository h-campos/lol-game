"use client";

import { useState, type ReactElement } from "react";
import { NavbarMenu } from "@/lib/components/navbar-menu/navbarMenu";
import { Button } from "@/lib/components/ui/button";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export const Navbar = (): ReactElement => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div className="text-white bg--500 w-full mb-10 flex justify-between items-center">
      <span style={{ filter: "drop-shadow(0px 5px 12px #ffffff)" }} className="text-2xl font-bold text-titleHighlight">LOLGAMES</span>
      <div className="flex gap-2">
        {isConnected && (
          <>
            <Button variant={"outline"} onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
            </Button>
            <NavbarMenu />
          </>
        )}
        {!isConnected && (
          <>
            <Button variant={"default"}>Log in</Button>
            <Button variant={"default"}>Sign up</Button>
          </>
        )}
      </div>
    </div>
  );
};