import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  // First, apply internationalization middleware
  const response = intlMiddleware(req);

  // Authentication logic
  const accessToken = req.cookies.get("_s_t");
  const userPermissions = req.cookies.get("_s_ap");
  const userGroups = req.cookies.get("_s_ag");

  const protectedRoutes = ["/dashboard", "/admin"];
  const isProtectedRoute = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Return the modified response
  return response;
}

// Update matcher to include both i18n routes and protected routes
export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)", // Matches for i18n middleware
    "/dashboard/:path*", // Protect dashboard
    "/admin/:path*", // Protect admin
  ],
};
