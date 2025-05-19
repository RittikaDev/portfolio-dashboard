// "use server";

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { getCurrentUser } from "./utils/authService";

// export async function middleware(request: NextRequest) {
//   setTimeout(async () => {
//     const user = await getCurrentUser();
//     console.log("user", user);
//   }, 500);
//   const token = request.cookies.get("refreshToken")?.value;
//   const authToken = request.cookies.get("authToken")?.value;
//   console.log("authToken", authToken);
//   console.log("Token found:", token);
//   // console.log("request", request);

//   // Redirect to login if no token and accessing protected route
//   if (!authToken && request.nextUrl.pathname.startsWith("/dashboard")) {
//     console.log("No token found");
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
//     return NextResponse.redirect(loginUrl);
//   }
//   console.log("here after token found");
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login"];

// const roleBasedPrivateRoutes = {
// 	user: [/^\/user/, /^\/create-shop/], // USER WILL BE ABLE TO ACESS ROUTES THAT STARTS WITH user
// 	admin: [/^\/admin/], // ADMIN WILL BE ABLE TO ACESS ROUTES THAT STARTS WITH admin
// };
const roleBasedPrivateRoutes = {
  admin: [
    /^\/dashboard$/,
    /^\/dashboard\/projects/,
    /^\/dashboard\/blogs/,
    /^\/dashboard\/experience/,
    /^\/dashboard\/messages/,
    /^\/dashboard\/skills/,
  ],
};

// RUNS ON SERVER
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  console.log(token);
  const userInfo = await getCurrentUser();
  console.log("user", userInfo);

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next(); // IF NOT USER EXITS, ALLOW TO GOTO AUTH ROUTES THAT IS "/login", "/register"
    } else {
      return NextResponse.redirect(
        new URL(
          // `https://savorly-two.vercel.app/login?redirectPath=${pathname}`,
          `https://portfolio-dashboard-six-lime.vercel.app/login?redirectPath=${pathname}`, // REDIRECT PATH WILL REDIRECT TO THE ROUTE WHERE USER ORIGINALLY WANTED TO GO RIGHT AFTER AUTHENTICATION IS DONE
          request.url
        )
      );
    }
  }
  console.log(userInfo);
  // CHECK IF THERE'S ROLE WHEN LOGGING IN, ALSO CHECK IF roleBasedPrivateRoutes HAS THAT ROLE, LIKE NOW, ANY ROLE OTHER THAN USER AND ADMIN IS NOT PERMISSIBLE
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

// MIDDLEWARE WILL ONLY GET CALLED FOR BELOW ROUTES (AUTOMATIC, NOWHERE NEEDS TO BE IMPORTED)
export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/projects",
    "/dashboard/blogs",
    "/dashboard/experience",
    "/dashboard/messages",
    "/dashboard/skills",
  ],
};
