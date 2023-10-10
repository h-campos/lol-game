"use client";

import { useEffect, type ReactElement } from "react";
import { Button } from "@/lib/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUserContext } from "@/lib/utils/contexts/user-provider";
import { redirect } from "next/navigation";
import { Card, CardHeader } from "@/lib/components/ui/card";
import Image from "next/image";
import useSwr from "swr";
import { fetcher } from "@/lib/utils/database/fetcher";

type Props = {
 userCount: number;
 userCountPlayed: number;
}

const Home = (): ReactElement => {
  const supabase = createClientComponentClient();
  const { user } = useUserContext();
  const { data, isLoading } = useSwr<Props>("/api/stats", fetcher);


  useEffect(() => {
    if (user) {
      redirect("/app");
    }
  }, [user]);


  return (
    <div className="w-full mb:w-2/4 flex items-center flex-col md:gap-2 gap-10">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl md:text-left text-center">
        Welcome on <span className="font-extrabold text-titleHighlight">LOLGAMES</span>
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-4 text-center text-lg line-clamp-2 mb-4 max-w-3xl">
        Test your knowledge on the game League of Legends, battle your friends and see your score.
        Before all that you need to login with your Discord account.
      </p>
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
      <Card className="mt-4 md:w-[650px] w-full">
        <CardHeader className="flex flex-row items-center justify-center md:gap-32 gap-16">
          <div className="flex flex-col items-center justify-center">
            {!isLoading && data && (
              <>
                <h2 className="text-titleHighlight text-6xl font-bold">{data.userCount}
                  <span className="text-lg ml-2 text-neutral-50 font-normal">users</span></h2>
                <p className="text-lg">registered.</p>
              </>
            )}
          </div>
          <div className="flex flex-col items-center justify-center !mt-0">
            {!isLoading && data && (
              <>
                <h2 className="text-titleHighlight text-6xl font-bold">{data.userCountPlayed}
                  <span className="text-lg ml-2 text-neutral-50 font-normal">users</span></h2>
                <p className="text-lg">played today.</p>
              </>
            )}
          </div>
        </CardHeader>
      </Card>
      <Image className="w-[700px]" src={"/assets/metadata-preview.png"} alt="Test" width={"700"} height={700} />
    </div>
  );
};

export default Home;