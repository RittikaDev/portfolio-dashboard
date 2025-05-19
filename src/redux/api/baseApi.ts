import {
	createApi,
	fetchBaseQuery,
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import envConfig from "@/config/env.config";

const baseQuery = fetchBaseQuery({
	// baseUrl: process.env.API_BASE_URL,
	baseUrl: `${envConfig.baseApi}`,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const access_token = (getState() as RootState).auth.access_token;
		headers.set("accept", "application/json");
		// console.log("Access Token:", access_token);
		if (access_token) headers.set("authorization", `Bearer ${access_token}`);

		return headers;
	},
});

const baseQueryWithRefreshToken: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		try {
			const refreshToken = (api.getState() as RootState).auth.refresh_token;

			// Make a request to refresh the token
			const res = await fetch(`${envConfig.baseApi}/refresh-token`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${refreshToken}`,
				},
			});

			const data = await res.json();
			if (data?.success) {
				const user = (api.getState() as RootState).auth.user;
				api.dispatch(
					setUser({ user, token: data.data.token, refresh_token: refreshToken })
				);

				// Retry the original query with the new token
				result = await baseQuery(args, api, extraOptions);
			} else {
				toast.error("Please login again to continue");

				api.dispatch(logout());
				signOut();
			}
		} catch (error) {
			toast.error(
				" Token refresh failed. Possibly due to expired or invalid session token:"
			);
			console.error(
				"Token refresh failed. Possibly due to expired or invalid session token:",
				error
			);
		}
	}

	return result;
};

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQueryWithRefreshToken,
	tagTypes: ["user", "post", "experience", "skills", "projects"],
	endpoints: () => ({}),
});
