import { prisma } from "@/lib/utils/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type RequestBody = {
  scoreChampions: number;
  scoreSpellsGuessing: number;
}

export const POST = async(req: NextRequest): Promise<NextResponse> => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse(JSON.stringify({ error: "You are not authorized." }), { status: 401 });
  const body: RequestBody = await req.json() as RequestBody;

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      Games: {
        updateMany: {
          where: { gameName: "Spells Guessing" },
          data: {
            status: "unavailable"
          }
        }
      }
    },
    include: {
      Games: true
    }
  });

  const lastScore = await prisma.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      spellsGuessingScore: true
    }
  });

  if (lastScore) {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        spellsGuessingScore: lastScore.spellsGuessingScore + body.scoreChampions + body.scoreSpellsGuessing + 1
      }
    });
  }


  return new NextResponse("State of Blurry Champions changed.", { status: 200 });
};