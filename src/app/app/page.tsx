/* eslint-disable max-len */
"use client";

import { type ReactElement, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";
import Link from "next/link";
import { useUserContext } from "@/lib/utils/contexts/user-provider";
import { redirect } from "next/navigation";
import useSwr from "swr";
import type { Games, Prisma } from "@prisma/client";
import { fetcher } from "@/lib/utils/database/fetcher";
import { Skeleton } from "@/lib/components/ui/skeleton";
import { Badge } from "@/lib/components/ui/badge";
import { LeaderBoard } from "./_components/leaderboard";
import { ColorsInformations } from "./_components/colorsInformations";
// import { Statistics } from "./_components/statistics";
import { DialogReportProposal } from "@/lib/components/dialog-report-proposal/dialogReportProposal";
import { ReportProposal } from "./_components/reportProposal";

type Props = Prisma.UserGetPayload<{
  include: { Games: true };
}>

const Home = (): ReactElement => {
  const { user } = useUserContext();
  const { data, isLoading } = useSwr<Props>("/api/showGamesButton", fetcher);

  useEffect(() => {
    if (user === null) {
      redirect("/");
    }
  }, [user]);

  return (
    <div className="w-full md:w-2/4 flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle className="mb-2 font-medium">Welcome on <span className="font-bold text-titleHighlight">LOLGAMES</span></CardTitle>
          <CardDescription>
            Test your knowledge on the game League of Legends, battle your friends and see your score.
          </CardDescription>
        </CardHeader>
        <Separator className="w-[94%] mx-auto" />
        <CardContent className="pt-6 relative">
          <ColorsInformations />
          <CardDescription>
          To start a game, please click on one of available below.
            <div className="mt-4 flex gap-4 flex-wrap">
              {isLoading && <Skeleton className="h-10 w-full" />}
              {!isLoading && data && (
                <>
                  {data.Games.map((game: Games, idx: number) => {
                    if (game.status === "unavailable") {
                      return (<div className="relative" key={idx}><Button status={game.status} variant={"secondary"} disabled>{game.gameName}</Button><Badge className="absolute -top-3 -right-2">{data.timeLeft == 0 ? "less one hour left" : data.timeLeft.toString() + " hours left"}</Badge></div>);
                    } else if (game.status === "wip") {
                      return (<div className="relative" key={idx}><Button status={game.status} variant={"secondary"} disabled>{game.gameName}</Button><Badge className="absolute -top-3 -right-2">WIP</Badge></div>);
                    } else if (game.status === "available") {
                      return (<Link key={idx} href={game.gamePath}><Button status={game.status} variant={"secondary"}>{game.gameName}</Button></Link>);
                    }
                  })}
                </>
              )}
            </div>
          </CardDescription>
        </CardContent>
      </Card>
      {/* <Statistics /> */}
      <LeaderBoard />
      <ReportProposal />
      <DialogReportProposal />
    </div>
  );
};

export default Home;