import { NextRequest, NextResponse } from "next/server";
import { $supabase } from "@/app/lib/supabase";

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

    return NextResponse.json({
      success: true,
      message: "회원가입에 성공했습니다.",
    });
  } catch (error) {
    return NextResponse.json({
      error,
      success: false,
      message: "회원가입에 실패했습니다.",
    });
  }
}
