import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://portfolio-v2-alpha-woad.vercel.app",
	}),
	endpoints: (builder) => ({
		getBlogs: builder.query({
			query: () => "/blogs",
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogsQuery } = baseApi;
