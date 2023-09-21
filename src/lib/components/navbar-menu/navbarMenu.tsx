/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export const NavbarMenu = (): ReactElement => {
  const supabase = createClientComponentClient();
  const { user, setUser } = useUserContext();

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon className="transition-colors text-neutral-950 dark:text-neutral-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {user && user !== "loading" && (
              <>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt="@shadcn" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="ml-2">{user?.user_metadata?.full_name}</span>
              </>
            )}

          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
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