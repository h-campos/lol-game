"use client";

import { useState, type ReactElement } from "react";
import { NavbarMenu } from "@/lib/components/navbar-menu/navbarMenu";
import { Button } from "@/lib/components/ui/button";
import { ToggleTheme } from "../toggle-theme/toggleTheme";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const Navbar = (): ReactElement => {
  const supabase = createClientComponentClient();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="text-white bg--500 w-full mb-10 flex justify-between items-center">
      <Link href="/">
        <span style={{ filter: "drop-shadow(0px 5px 12px #ffffff)" }} className="text-2xl font-bold text-titleHighlight">LOLGAMES</span>
      </Link>
      <div className="flex gap-2">
        {isConnected && (
          <>
            <ToggleTheme />
            <NavbarMenu />
          </>
        )}
        {!isConnected && (
          <>
            <Button variant={"default"} onClick={() => {
              void supabase.auth.signInWithOAuth({ provider: "discord", options: {
                redirectTo: `${window.location.origin}/auth/callback`
              } });
            }}>Log in</Button>
            <Button variant={"default"}>Sign up</Button>
          </>
        )}
      </div>
    </div>
  );
};