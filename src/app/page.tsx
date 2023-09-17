"use client";

import type { ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { Separator } from "@/lib/components/ui/separator";

const Home = (): ReactElement => {
  return (
    <div className="w-2/4 flex flex-col">
      <Card className="bg-cardBackground">
        <CardHeader>
          <CardTitle className="mb-2 font-medium">Welcome on <span className="font-bold text-titleHighlight">LOLGAMES</span></CardTitle>
          <CardDescription>
            Test your knowledge on the game League of Legends, battle your friends and see your score.
          </CardDescription>
        </CardHeader>
        <Separator className="w-[95%] mx-auto" />
        <CardContent className="pt-6">
          <CardDescription>
          To start a game, please click on one of available below.
            <div className="mt-4 flex gap-4 flex-wrap">
              <Button status={"available"} variant={"secondary"}>Blurry Champions</Button>
              <Button status={"unavailable"} variant={"secondary"} disabled>Blurry Champions</Button>
              <Button status={"wip"} variant={"secondary"} disabled>Blurry Champions</Button>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;