import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { $supabase } from "@/app/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const {
      data: { user },
    } = await $supabase.auth.getUser();

    return NextResponse.json({ data: user, success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 400 });
  }
}
