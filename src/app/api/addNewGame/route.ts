import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/utils/database";

export const GET = async(): Promise<NextResponse> => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "You are not authorized." }, { status: 401 });

  const userGamesCount = await prisma.games.count({
    where: {
      userId: user.id
    }
  });

  if (userGamesCount <= 2) {
    await prisma.games.create({
      data: {
        id: Math.random().toString(36).substring(7).toString(),
        gameName: "Objects Cost",
        status: "wip",
        gamePath: "/app/objects-cost",
        userId: user.id
      }
    });
  }

  return NextResponse.json(userGamesCount);
};