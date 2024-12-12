import { NextRequest, NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";

type SignInRequest = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  const { email, password }: SignInRequest = await request.json();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
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

    return NextResponse.json({ status: 200 });
  }
}
