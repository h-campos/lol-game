import type { ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";

const Home = (): ReactElement => {
  return (
    <div className="w-2/4 flex flex-col">
      <Card className="bg-cardBackground">
        <CardHeader>
          <CardTitle>Welcome on LOL GAMES</CardTitle>
          <CardDescription>
            With this website you can test your knowledge on the game League of Legends, battle your friends and see your score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>
          To start with a random game, click on the button below.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button>Start a game</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;