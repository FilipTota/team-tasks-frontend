import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (accessToken && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the token doesn't exist, redirect to login page
  if (!accessToken || isTokenExpired(accessToken)) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const response = await fetch("http://localhost:8080/auth/refreshToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    if (response.ok) {
      // Set the new access token in the cookies
      const res = NextResponse.next();
      res.cookies.set("accessToken", result.accessToken, { httpOnly: true });

      return res; // Proceed with the request using the new access token
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow the request to proceed if token is valid
  return NextResponse.next();
}

const isTokenExpired = (accessToken: string) => {
  const decoded = jwtDecode(accessToken);

  // If 'exp' is undefined, we assume the token is expired
  if (decoded.exp === undefined) {
    return true;
  }

  return decoded.exp < Date.now() / 1000; // --> Date.now() / 1000 (devided by 1000 to get seconds)
};

export const config = {
  matcher: ["/dashboard"], // Apply the middleware only to the dashboard page
};
