import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/utils/database";

export const dynamic = "force-dynamic";

export const GET = async(request: NextRequest): Promise<NextResponse> => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const resp = await supabase.auth.exchangeCodeForSession(code);
    const userAlreadyExist = await prisma.user.findUnique({ where: { id: resp.data.user?.id } });
    if (userAlreadyExist) return NextResponse.redirect(requestUrl.origin + "/app");
    await prisma.user.create({
      data: {
        id: resp.data.user?.id || Math.random().toString(36).substring(7).toString(),
        email: resp.data.user?.email ?? "",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        username: resp.data.user?.user_metadata.custom_claims?.global_name as string ?? "",
        Games: {
          create: [
            {
              id: Math.random().toString(36).substring(7).toString(),
              gameName: "Blurry Champions",
              status: "available",
              gamePath: "/app/blurry-champions"
            },
            {
              id: Math.random().toString(36).substring(7).toString(),
              gameName: "Blurry Spells",
              status: "unavailable",
              gamePath: "/app/blurry-spells"
            },
            {
              id: Math.random().toString(36).substring(7).toString(),
              gameName: "Skins Guessing",
              status: "wip",
              gamePath: "/app/skins-guessing"
            }
          ]
        }
      }
    });
    await prisma.$disconnect();
  }

  return NextResponse.redirect(requestUrl.origin + "/app");
};