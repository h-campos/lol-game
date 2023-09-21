"use client";

import type { ReactElement } from "react";
import { Button } from "@/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/lib/components/ui/dropdown-menu";
import Link from "next/link";
import { HamburgerMenuIcon, ExitIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { gamesList } from "@/lib/utils/data/gamesList";
import { useUserContext } from "@/lib/utils/contexts/user-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const NavbarMenu = (): ReactElement => {
  const supabase = createClientComponentClient();
  const { setUser } = useUserContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon className="transition-colors text-neutral-950 dark:text-neutral-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {gamesList.map((game, idx) => {
            if (game.status === "wip" || game.status === "unavailable") {
              return  <DropdownMenuItem key={idx} disabled>{game.visualName}</DropdownMenuItem>;
            } else {
              return <Link key={idx} href={game.path}>
                <DropdownMenuItem>{game.visualName}</DropdownMenuItem>
              </Link>;
            }
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Pencil1Icon className="mr-2" /> Make a proposal
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          void supabase.auth.signOut().then(() => {
            setUser(null);
          });
        }}>
          <ExitIcon className="mr-2" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};