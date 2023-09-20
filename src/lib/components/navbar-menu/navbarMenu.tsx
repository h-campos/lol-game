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

export const NavbarMenu = (): ReactElement => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon />
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
        <DropdownMenuItem>
          <ExitIcon className="mr-2" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};