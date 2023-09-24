import { prisma } from "@/lib/utils/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export const POST = async(): Promise<NextResponse> => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse(JSON.stringify({ error: "You are not authorized." }), { status: 401 });

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      Games: {
        updateMany: {
          where: { gameName: "Blurry Champions" },
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