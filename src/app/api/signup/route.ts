import { NextRequest, NextResponse } from "next/server";
import { $supabase } from "@/utils/supabase/server";

type Data = {
  message?: string;
  error?: string;
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const { error } = await $supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return NextResponse.redirect("/sign-in");
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
