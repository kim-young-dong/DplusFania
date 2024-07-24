// lib/auth.ts
import { $supabase } from "@/app/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access_token")?.value;
  const refresh_token = req.cookies.get("refresh_token")?.value;

  if (access_token && refresh_token) {
    switch (true) {
      case req.nextUrl.pathname == "/sign-in":
      case req.nextUrl.pathname == "/sign-up":
      case req.nextUrl.pathname == "/find-id":
      case req.nextUrl.pathname == "/find-password":
        return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
