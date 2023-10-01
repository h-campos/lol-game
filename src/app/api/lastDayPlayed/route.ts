import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/utils/database";
// import { dayJS } from "@/lib/utils/day-js";

export const GET = async(): Promise<NextResponse> => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "You are not authorized." }, { status: 401 });

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: { lastDayPlayed: true }
  });

  const lastDayPlayed = data?.lastDayPlayed.toLocaleString();

  console.log(lastDayPlayed);

  if (!lastDayPlayed) return NextResponse.json({ error: "No data found." }, { status: 404 });

  // if (dayJS(lastDayPlayed).isBefore(dayJS())) {
  //   await prisma.user.update({
  //     where: {
  //       id: user.id
  //     },
  //     data: {
  //       Games: {
  //         updateMany: {
  //           where: { gameName: "Blurry Champions" },
  //           data: {
  //             status: "available"
  //           }
  //         }
  //       }
  //     },
  //     include: {
  //       Games: true
  //     }
  //   });
  // }

  return new NextResponse("The player have to wait to replay the games", { status: 200 });
};