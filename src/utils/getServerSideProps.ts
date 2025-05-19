// authCheck.ts
import { verifyToken } from "./verifyToken";

export async function requireAuth(context: {
	req: { cookies: { refreshToken?: string } };
}) {
	const token = context.req.cookies.refreshToken;

	if (!token)
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};

	try {
		const decoded = verifyToken(token);
		return {
			props: {
				user: decoded,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
}
