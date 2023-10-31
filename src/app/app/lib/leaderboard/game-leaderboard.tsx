/* eslint-disable max-len */
import type { Component } from "@/lib/utils/component";
import type { GameScore } from "./leaderboard.type";
import { TabsContent } from "@/lib/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableRowLeaderBoard } from "@/lib/components/ui/table";
import { Button } from "@/lib/components/ui/button";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/lib/components/ui/skeleton";

type Props = {
 tabsContentValue: string;
 showAllUsers: boolean;
 setShowAllUsers: (value: boolean) => void;
 data: GameScore[] | undefined;
 loading: boolean;
}

const GameLeaderBoard: Component<Props> = ({ tabsContentValue, showAllUsers, setShowAllUsers, data, loading }) => {
  return (
    <TabsContent value={tabsContentValue}>
      {loading && (<Skeleton className="rounded-md w-full h-6" />)}
      {data && !loading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pseudo</TableHead>
              <TableHead className="text-end">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative">
            {data && data.slice(0, showAllUsers ? data.length : 4).map((score: GameScore, idx: number) => {
              const scorePropertyName = Object.keys(score).find(key => key !== "username");
              if (idx === 0 && score[scorePropertyName  as keyof GameScore] === 0) {
                return <TableRowLeaderBoard key={idx}>
                  <TableCell>{score.username}</TableCell>
                  <TableCell className="text-end">{score[scorePropertyName  as keyof GameScore]}</TableCell>
                </TableRowLeaderBoard>;
              }
              if (idx === 0) {
                return <TableRowLeaderBoard className="font-bold" key={idx}>
                  <TableCell className="rounded-tl-md rounded-bl-md">
                    <div className="flex items-center gap-2">
                      {score.username}
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-crown" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="#E2B53E" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
                      </svg>
                    </div>
                  </TableCell>
                  <TableCell className="text-end rounded-tr-md rounded-br-md">{score[scorePropertyName  as keyof GameScore]}</TableCell>
                </TableRowLeaderBoard>;
              } else {
                return <TableRowLeaderBoard key={idx}>
                  <TableCell>{score.username}</TableCell>
                  <TableCell className="text-end">{score[scorePropertyName  as keyof GameScore]}</TableCell>
                </TableRowLeaderBoard>;
              }
            })}
            <Button variant={"secondary"} className={twMerge("absolute left-2/4 -translate-x-2/4 bottom-6 md:bottom-0 z-10", showAllUsers ? "opacity-50" : "")} onClick={() => setShowAllUsers(!showAllUsers)}>
              {showAllUsers ? "Show less" : "Show more"}
            </Button>
          </TableBody>
        </Table>
      )}
    </TabsContent>
  );
};

export default GameLeaderBoard;