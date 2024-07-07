import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { $supabase } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    } else if (data.session) {
      const cookie = cookies();
      cookie.set({
        name: "access_token",
        value: data.session.access_token,
        maxAge: data.session.expires_in,
      });
      cookie.set({
        name: "refresh_token",
        value: data.session.refresh_token,
      });
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 400 });
  }
}
