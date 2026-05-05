import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isPrivatePage =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/notes");

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && refreshToken) {
    const sessionResponse = await checkSession();
    const setCookie = sessionResponse.headers["set-cookie"];

    const response = isAuthPage
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();

    if (setCookie) {
      const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      cookiesArray.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
    }

    return response;
  }

  if (!accessToken && !refreshToken && isPrivatePage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
