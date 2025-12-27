import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { API_BASE_URL } from "@/lib/config/api";

/**
 * Custom base query to handle error responses properly
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    // Add any default headers here (e.g., authorization tokens)
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  
  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('API Request:', args);
    console.log('API Response:', result);
  }
  
  // Return result as-is - RTK Query will handle errors properly
  return result;
};

/**
 * Base API slice for RTK Query
 * This is the main API configuration that all other API slices will extend
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Auth", "User"], // Add more tag types as needed
  endpoints: () => ({}), // Endpoints will be injected by other API slices
});

