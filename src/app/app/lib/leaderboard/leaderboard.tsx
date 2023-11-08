/* eslint-disable max-len */
import { type ReactElement, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { Separator } from "@/lib/components/ui/separator";
import useSwr from "swr";
import { fetcher } from "@/lib/utils/database/fetcher";
import { Badge } from "@/lib/components/ui/badge";
import type { PropsGameScore } from "./leaderboard.type";
import GameLeaderBoard from "./game-leaderboard";

export const LeaderBoard = (): ReactElement => {
  const { data: blurryChampionsData, isLoading: blurryChampionsIsLoading } = useSwr<PropsGameScore>("/api/getScore/blurryChampionsScore", fetcher);
  const { data: spellsGuessingData, isLoading: spellsGuessingIsLoading } = useSwr<PropsGameScore>("/api/getScore/spellsGuessingScore", fetcher);
  const { data: objectsCostData, isLoading: objectsCostIsLoading } = useSwr<PropsGameScore>("/api/getScore/objectsCostScore", fetcher);
  const [showAllUsers, setShowAllUsers] = useState<boolean>(false);

  const leaderboardData = [
    {
      data: blurryChampionsData,
      loading: blurryChampionsIsLoading,
      tabsContentValue: "blurry-champions"
    },
    {
      data: spellsGuessingData,
      loading: spellsGuessingIsLoading,
      tabsContentValue: "spells-guessing"
    },
    {
      data: objectsCostData,
      loading: objectsCostIsLoading,
      tabsContentValue: "objects-cost"
    }
  ];

  return (
    <Card className="relative">
      <CardHeader className="pb-4">
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See who is the best player.</CardDescription>
      </CardHeader>
      <Separator className="w-[94%] mx-auto" />
      <CardContent className="pt-4">
        <Tabs defaultValue="blurry-champions">
          <div className="w-full sm:overflow-visible overflow-x-scroll overflow-y-visible">
            <TabsList className="mb-2">
              <TabsTrigger value="blurry-champions">
                Blurry Champions
              </TabsTrigger>
              <TabsTrigger value="spells-guessing">
              Spells Guessing
              </TabsTrigger>
              <TabsTrigger value="objects-cost">
              Objects Cost
              </TabsTrigger>
              <TabsTrigger className="relative" value="guess-pro" disabled>
                <Badge className="absolute -top-4 -right-4 hidden sm:block" variant="default">
                WIP
                </Badge>
              Guess Pro
              </TabsTrigger>
            </TabsList>
          </div>
          {leaderboardData.map((data, idx) => (
            <GameLeaderBoard key={idx} data={data.data} loading={data.loading} setShowAllUsers={setShowAllUsers} showAllUsers={showAllUsers} tabsContentValue={data.tabsContentValue} />
          ))}
        </Tabs>
      </CardContent>
      {!showAllUsers && (
        <div className="w-full h-52 absolute bottom-0 rounded-br-lg bg-bottom-leaderb-white dark:bg-bottom-leaderb-dark rounded-bl-lg"></div>
      )}
    </Card>
  );
};