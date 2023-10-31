import { prisma } from "@/lib/utils/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type RequestBody = {
  score: number;
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
          where: { gameName: "Objects Cost" },
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
      objectsCostScore: true
    }
  });

  if (lastScore) {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        objectsCostScore: lastScore.objectsCostScore + body.score
      }
    });
  }


  return new NextResponse("State of Objects Cost changed.", { status: 200 });
};