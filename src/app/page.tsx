"use client";

import { useEffect, type ReactElement } from "react";
import { Card, CardHeader } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUserContext } from "@/lib/utils/contexts/user-provider";
import { redirect } from "next/navigation";

const Home = (): ReactElement => {
  const supabase = createClientComponentClient();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      redirect("/app");
    }
  }, [user]);


  return (
    <div className="w-2/4 flex items-center flex-col gap-2">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
        Welcome on <span className="font-extrabold text-titleHighlight">LOLGAMES</span>
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-lg line-clamp-2 mb-6">
        Test your knowledge on the game League of Legends, battle your friends and see your score.
        Before all that you need to login with your Discord account.
      </p>
      <Card>
        <CardHeader>
          <Button
            onClick={() => {
              void supabase.auth.signInWithOAuth({ provider: "discord", options: {
                redirectTo: `${window.location.origin}/auth/callback`
              } });
            }}
            className="px-8"
            variant="discord"
          >
            Login with Discord
            <DiscordLogoIcon className="ml-2" />
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Home;