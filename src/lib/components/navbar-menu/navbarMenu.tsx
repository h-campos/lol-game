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
import { HamburgerMenuIcon, ExitIcon } from "@radix-ui/react-icons";
import { useUserContext } from "@/lib/utils/contexts/user-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import useSwr from "swr";
import type { Games, Prisma } from "@prisma/client";
import { fetcher } from "@/lib/utils/database/fetcher";
import { DialogReportProposalStore } from "@/lib/utils/stores/dialogReportProposalStore";

type Props = Prisma.UserGetPayload<{
  include: { Games: true };
}>

export const NavbarMenu = (): ReactElement => {
  const supabase = createClientComponentClient();
  const { user, setUser } = useUserContext();
  const { data, isLoading } = useSwr<Props>("/api/showGamesButton", fetcher);
  const toggle = DialogReportProposalStore((state) => state.toggle);

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
          {isLoading && <Skeleton className="h-8 w-full" />}
          {!isLoading && data && (
            <>
              {data.Games.map((game: Games, idx: number) => {
                if (game.status === "unavailable" || game.status === "wip") {
                  return (<DropdownMenuItem key={idx} disabled>{game.gameName}</DropdownMenuItem>);
                } else if (game.status === "available") {
                  return (<Link key={idx} href={game.gamePath}><DropdownMenuItem>{game.gameName}</DropdownMenuItem></Link>);
                }
              })}
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={toggle}>
            Report / Proposal
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