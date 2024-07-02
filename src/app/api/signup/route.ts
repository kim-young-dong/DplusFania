import { NextRequest, NextResponse } from "next/server";
import { $supabase } from "@/utils/supabase/server";

type Data = {
  message?: string;
  error?: string;
};

export const POST = async (req: NextRequest, res: NextResponse<Data>) => {
  const { email, password } = await req.json();
  console.log("req-signup", email, password);

  try {
    const { user, error } = await $supabase.auth.signUp({
      email,
      password,
    });
    console.log("res-signup", user, error);

    if (error) {
      throw error;
    }

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
