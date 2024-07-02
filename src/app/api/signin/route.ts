import { NextRequest, NextResponse } from "next/server";
import { $supabase } from "@/utils/supabase/server";

type Data = {
  message?: string;
  error?: string;
};

export const POST = async (req: NextRequest, res: NextResponse<Data>) => {
  const { email, password } = await req.json();
  console.log("req-signin", email, password);

  try {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log("res-signin", data, error);

    if (error) {
      throw error;
    }

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
