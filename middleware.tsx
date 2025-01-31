import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (accessToken: string) => {
  const decoded = jwtDecode(accessToken);
  return decoded.exp === undefined || decoded.exp < Date.now() / 1000; // --> Date.now() / 1000 (devided by 1000 to get seconds)
};

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // If the user is already at the signIn or singUp page and the accessToken does not exist, don't redirect them to "/" again (this happens because we have '/' defined in matcher at the ned of this file)
  if ((pathname === "/" || pathname === "/register") && !accessToken) {
    // Already on sign-in page, do not redirect
    return NextResponse.next(); // Allow the request to proceed to the sign-in page
  }

  // if user is signed in, prevent the user from going to '/' or '/register'
  if (accessToken && (pathname === "/" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the accessToken doesn't exist or is expired, redirect to login page or create new accessToken with provided refreshToken
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
      if (result.accessToken) {
        const res = NextResponse.next();
        // Set the new accessToken and refreshToken in the cookies
        res.cookies.set("accessToken", result.accessToken, { httpOnly: true });
        res.cookies.set("refreshToken", result.refreshToken, {
          httpOnly: true,
        });
        return res; // Proceed with the request using the new access token
      } else {
        // If no accessToken is returned from the refresh API, redirect to sign-in
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // Allow the request to proceed if token is valid
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/dashboard"], // Apply the middleware to these pages
};
