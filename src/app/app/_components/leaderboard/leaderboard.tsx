/* eslint-disable max-len */
import { type ReactElement } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/lib/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRowLeaderBoard,
  TableRow
} from "@/lib/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { Separator } from "@/lib/components/ui/separator";
import useSwr from "swr";
import { fetcher } from "@/lib/utils/database/fetcher";
import { Skeleton } from "@/lib/components/ui/skeleton";
import { Badge } from "@/lib/components/ui/badge";
import type { BlurryChampionsScore, PropsBlurryChampions } from "./leaderboard.type";

export const LeaderBoard = (): ReactElement => {
  const { data, isLoading } = useSwr<PropsBlurryChampions>("/api/getScore/blurryChampionsScore", fetcher);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See who is the best player.</CardDescription>
      </CardHeader>
      <Separator className="w-[94%] mx-auto" />
      <CardContent className="pt-4">
        <Tabs defaultValue="blurry-champions">
          <TabsList className="mb-2">
            <TabsTrigger value="blurry-champions">
                Blurry Champions
            </TabsTrigger>
            <TabsTrigger className="relative" value="spells-guessing" disabled>
              <Badge className="absolute -top-4 -right-4" variant="default">
                WIP
              </Badge>
              Spells Guessing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="blurry-champions">
            {isLoading && (<Skeleton className="rounded-md w-full h-6" />)}
            {data && !isLoading && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pseudo</TableHead>
                    <TableHead className="text-end">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.map((score: BlurryChampionsScore, idx: number) => {
                    if (idx === 0) {
                      return <TableRowLeaderBoard className="bg-yellow-500/75 font-bold hover:bg-yellow-500" key={idx}>
                        <TableCell className="rounded-tl-md rounded-bl-md">
                          <div className="flex items-center gap-2">
                            {score.username}
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-crown" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="#E2B53E" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
                            </svg>
                          </div>
                        </TableCell>
                        <TableCell className="text-end rounded-tr-md rounded-br-md">{score.blurryChampionsScore}</TableCell>
                      </TableRowLeaderBoard>;
                    }
                    return <TableRowLeaderBoard key={idx}>
                      <TableCell>{score.username}</TableCell>
                      <TableCell className="text-end">{score.blurryChampionsScore}</TableCell>
                    </TableRowLeaderBoard>;
                  })}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};