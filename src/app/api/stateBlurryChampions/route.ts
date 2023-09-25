import { prisma } from "@/lib/utils/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type RequestBody = {
  gameName: string;
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
          where: { gameName: body.gameName },
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

  return new NextResponse("State of Blurry Champions changed.", { status: 200 });
};