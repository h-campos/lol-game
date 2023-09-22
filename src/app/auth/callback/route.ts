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
    console.log("resp", resp);
    const userAlreadyExist = await prisma.user.findUnique({ where: { id: resp.data.user?.id } });
    if (userAlreadyExist) return NextResponse.redirect(requestUrl.origin + "/home");
    await prisma.user.create({
      data: {
        id: resp.data.user?.id || Math.random().toString(36).substring(7).toString(),
        email: resp.data.user?.email ?? "",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        username: resp.data.user?.user_metadata.custom_claims.global_name ?? ""
      }
    });
    await prisma.$disconnect();
  }

  return NextResponse.redirect(requestUrl.origin + "/home");
};