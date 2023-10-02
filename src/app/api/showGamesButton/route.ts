import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/utils/database";
import { dayJS } from "@/lib/utils/day-js";

export const GET = async(): Promise<NextResponse> => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "You are not authorized." }, { status: 401 });

  const dataLastDayPlayed = await prisma.user.findUnique({
    where: { id: user.id },
    select: { lastDayPlayed: true }
  });

  const lastDayPlayed = dataLastDayPlayed?.lastDayPlayed;
  dayJS.tz(lastDayPlayed, "Europe/Paris");

  if (!lastDayPlayed) return NextResponse.json({ error: "No data found." }, { status: 404 });

  if ((dayJS(lastDayPlayed).get("date") < dayJS().get("date")) || (dayJS(lastDayPlayed).get("month") < dayJS().get("month"))) {
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
  }

  const data = await prisma.user.findUnique({
    where: { id: user.id }, include: { Games: true }
  });

  return NextResponse.json(data);
};