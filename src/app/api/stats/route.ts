import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils/database";
import { dayJS } from "@/lib/utils/day-js";

export const GET = async(): Promise<NextResponse> => {
  const userCount = await prisma.user.count();

  const today = dayJS().set("hour", 0).set("minute", 0).set("second", 0);

  const userCountPlayed = await prisma.user.count({
    where: {
      lastDayPlayed: {
        gte: today.toDate()
      }
    }
  });

  return NextResponse.json({ userCount: userCount, userCountPlayed: userCountPlayed });
};