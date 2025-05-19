import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (userInfo) => {
				return {
					url: `/api/auth/login`,
					method: "POST",
					credentials: "include",
					body: userInfo,
				};
			},
			invalidatesTags: ["user"],
		}),
		logoutUser: builder.mutation({
			query: () => {
				return {
					url: "/api/auth/logout",
					method: "POST",
				};
			},
			invalidatesTags: ["user"],
		}),

		forgotPassword: builder.mutation({
			query: (userInfo) => {
				console.log({ userInfo });
				return {
					url: "/auth/forgot-password",
					method: "POST",
					body: userInfo,
				};
			},
			invalidatesTags: ["user"],
		}),
		resetPassword: builder.mutation({
			query: ({ data, token }) => {
				return {
					url: "/auth/reset-password",
					method: "POST",
					body: data,
					headers: {
						Authorization: `${token}`,
					},
				};
			},
			invalidatesTags: ["user"],
		}),

		register: builder.mutation({
			query: (userInfo) => {
				return {
					url: "/users/register",
					method: "POST",
					body: userInfo,
				};
			},
		}),

		getMe: builder.query({
			query: () => ({
				url: "/api/auth/current-user",
				method: "GET",
			}),
			providesTags: ["user"],
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutUserMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useRegisterMutation,
	useGetMeQuery,
} = authApi;
