import { NextRequest, NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { email, password, isKeep } = await request.json();
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  cookies().set("sb_access_token", data?.session.access_token, {
    maxAge: data?.session.expires_in,
  });
  // cookies().set("sb_refresh_token", data?.session.refresh_token, {
  //   maxAge: 3600 * 24 * 30,
  // });

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
