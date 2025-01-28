import { NextResponse, NextRequest } from "next/server";
import Cookies from "js-cookie";

export function middleware(request: NextRequest) {
  const token = Cookies.get("accessToken");

  // If the token doesn't exist, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed if token is valid
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Apply the middleware only to the dashboard page
};
