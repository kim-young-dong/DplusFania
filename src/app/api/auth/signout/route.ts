import { NextRequest, NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/dist/server/api-utils";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json({ status: 200 });
}
