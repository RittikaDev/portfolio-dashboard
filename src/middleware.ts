import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("refreshToken");
	console.log(token);

	// Redirect to login if no token and accessing protected route
	if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
		console.log("No token found");
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}
	console.log("here after token found");
	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard", "/dashboard/:path*"],
};
