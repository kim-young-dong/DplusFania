import { NextRequest, NextResponse } from "next/server";
import { $supabase } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
  console.log("signin");

  const { email, password } = await req.json();

  try {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
