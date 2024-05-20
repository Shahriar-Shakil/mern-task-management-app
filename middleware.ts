import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/data/getCurrentUser";

// 1. Specify protected and public routes
const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/registration"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  //    3. Decrypt the session from the cookie

  const user = await getCurrentUser();
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && user?.id && !req.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
