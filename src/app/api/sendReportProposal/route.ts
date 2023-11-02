import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/utils/database";

type RequestBody = {
  message: string;
}

export const POST = async(req: NextRequest): Promise<NextResponse> => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "You are not authorized." }, { status: 401 });
  const body: RequestBody = await req.json() as RequestBody;

  await prisma.proposal.create({
    data: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      username: user.user_metadata.custom_claims.global_name,
      mail: user.email,
      message: body.message,
      userId: user.id
    }
  });

  return new NextResponse("");
};

export const GET = async(): Promise<NextResponse> => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "You are not authorized." }, { status: 401 });

  const data = await prisma.proposal.findMany({});

  return NextResponse.json(data);
};