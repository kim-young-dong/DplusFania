// lib/auth.ts
import { NextApiRequest, NextApiResponse } from "next";
import { $supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export async function middleware(req: NextApiRequest) {
  const token = req.cookies.access_token;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const {
    data: { user },
    error,
  } = await $supabase.auth.getUser(token);

  if (error) {
    return null;
  }

  return user;
}
export const config = {
  matcher: "/home/:path*",
};
