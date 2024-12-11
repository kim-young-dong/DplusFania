import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // no user, potentially respond by redirecting the user to the login page
    if (
      !request.nextUrl.pathname.includes("/auth") &&
      request.nextUrl.pathname !== "/"
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/sign-in";
      return NextResponse.redirect(url);
    }
  } else {
    switch (true) {
      case request.nextUrl.pathname == "/":
      case request.nextUrl.pathname == "/auth/sign-in":
      case request.nextUrl.pathname == "/auth/sign-up":
      case request.nextUrl.pathname == "/auth/find-id":
      case request.nextUrl.pathname == "/auth/find-password":
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
// middleware의 header에 원하는 정보를 담아 보내는 것으로 데이터 공유 가능
// import { headers } from "next/headers";로 headers를 import 해 사용
// const headers = new Headers(request.headers);
// headers.set("middlewareSet", "mydata");

// const resp = NextResponse.next({
//   request: {
//     headers,
//   },
// });
// console.log(resp, "resp");

// return resp;
