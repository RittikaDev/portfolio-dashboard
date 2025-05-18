// authCheck.ts
import { verifyToken } from "./verifyToken";

export async function requireAuth(context: {
	req: { cookies: { authToken?: string } };
}) {
	const token = context.req.cookies.authToken;

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
