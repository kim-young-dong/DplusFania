import { NextRequest, NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  if (data && data.user) {
    const user = {
      id: data.user.id,
      email: data.user.email || "",
    };

    // 반환된 유저는 클라이언트로 전달해 context에 저장
    return NextResponse.json(
      {
        user,
      },
      { status: 200 },
    );
  }
}
