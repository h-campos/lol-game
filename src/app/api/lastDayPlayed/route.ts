import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/utils/database";
import { dayJS } from "@/lib/utils/day-js";

export const GET = async(): Promise<NextResponse> => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "You are not authorized." }, { status: 401 });

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: { lastDayPlayed: true }
  });

  const lastDayPlayed = data?.lastDayPlayed;
  dayJS.tz(lastDayPlayed, "Europe/Paris");
  console.log(dayJS(lastDayPlayed).get("date"), "lastDayPlayed, day");
  console.log(dayJS(lastDayPlayed).get("month"), "lastDayPlayed, month");
  console.log(dayJS().get("date"), "dayJS, day");
  console.log(dayJS().get("month"), "dayJSn, month");

  if (!lastDayPlayed) return NextResponse.json({ error: "No data found." }, { status: 404 });

  if ((dayJS(lastDayPlayed).get("date") < dayJS().get("date")) || (dayJS(lastDayPlayed).get("month") < dayJS().get("month"))) {
    console.log("database day or month is lesser than today day or month");
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        Games: {
          updateMany: {
            where: { gameName: "Blurry Champions" },
            data: {
              status: "available"
            }
          }
        }
      },
      include: {
        Games: true
      }
    });
  } else {
    console.log("database day or month is greater than today day or month, user have to wait to play again to the games");
  }

  return new NextResponse("The player have to wait to replay the games", { status: 200 });
};