/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { Skeleton } from "../ui/skeleton";
import { redirect } from "next/navigation";

export const NavbarMenu = (): ReactElement => {
  const supabase = createClientComponentClient();
  const { user, setUser } = useUserContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon className="transition-colors text-neutral-950 dark:text-neutral-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center">
            {user == "loading" && (
              <>
                <Skeleton className="w-8 h-8 rounded-full mr-2" />
                <Skeleton className="w-16 h-4" />
              </>
            )}
            {user && user !== "loading" && (
              <>
                <Avatar>
                  <AvatarImage src={user.user_metadata.avatar_url} alt="@shadcn" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="ml-2">{user.user_metadata.custom_claims.global_name}</span>
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
          redirect("/");
        }}>
          <ExitIcon className="mr-2" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};