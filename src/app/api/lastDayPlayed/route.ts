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

  const lastDayPlayed = data?.lastDayPlayed.toLocaleDateString().split("/");

  if (!lastDayPlayed) return NextResponse.json({ error: "No data found." }, { status: 404 });

  const today = new Date().toLocaleDateString().split("/");

  if (dayJS(`${lastDayPlayed[1]}-${lastDayPlayed[0]}-${lastDayPlayed[2]}`).isBefore(dayJS())) {
    console.log("date in database less than today date");
  } else {
    console.log("date in database more or equal than today date");
  }

  console.log(dayJS());

  console.log(lastDayPlayed[0], today[0]);
  if (lastDayPlayed[0] < today[0]) {
    console.log("month in database less than today month");
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

  if (lastDayPlayed[1] < today[1]) {
    console.log("day in database less than today day");
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

  return new NextResponse("The player have to wait to replay the games", { status: 200 });
};