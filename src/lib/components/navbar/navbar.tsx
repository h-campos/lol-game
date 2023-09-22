"use client";

import type { ReactElement } from "react";
import { NavbarMenu } from "@/lib/components/navbar-menu/navbarMenu";
import { ToggleTheme } from "../toggle-theme/toggleTheme";
import Link from "next/link";
import { useUserContext } from "@/lib/utils/contexts/user-provider";

export const Navbar = (): ReactElement => {
  const { user } = useUserContext();

  return (
    <div className="text-white bg--500 w-full mb-10 flex justify-between items-center">
      <Link href="/app">
        <span style={{ filter: "drop-shadow(0px 5px 12px #ffffff)" }} className="text-2xl font-bold text-titleHighlight">LOLGAMES</span>
      </Link>
      <div className="flex gap-2">
        {user && user !== "loading" && (
          <>
            <ToggleTheme />
            <NavbarMenu />
          </>
        )}
      </div>
    </div>
  );
};