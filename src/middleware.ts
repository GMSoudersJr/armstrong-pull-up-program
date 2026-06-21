import { NextRequest, NextResponse } from "next/server";

const LEGACY_HOST = "armstrong-pull-up-program.vercel.app";
const CANONICAL_ORIGIN = "https://repyourself.app";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host === LEGACY_HOST) {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`${CANONICAL_ORIGIN}${pathname}${search}`, {
      status: 308,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
