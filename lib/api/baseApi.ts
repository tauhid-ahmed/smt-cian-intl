import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { API_BASE_URL } from "@/lib/config/api";
import type { RefreshTokenSuccessResponse } from "./authApi";

/**
 * Custom base query to handle error responses properly
 */
const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { arg }) => {
        if (!(typeof arg !== "string" && arg.body instanceof FormData)) {
            headers.set("Content-Type", "application/json");
        }

        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`);
            }
        }

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
    if (process.env.NODE_ENV === "development") {
        console.log("API Request:", args);
        console.log("API Response:", result);
    }

    // Handle 401 Unauthorized - try to refresh token
    if (result.error && result.error.status === 401) {
        // Don't try to refresh if this is already a refresh token request
        const url = typeof args === "string" ? args : args.url;
        if (url && url.includes("/auth/refresh-token")) {
            // If refresh token request also fails, clear tokens and return error
            if (typeof window !== "undefined") {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
            return result;
        }

        // Try to refresh the token
        const refreshToken =
            typeof window !== "undefined"
                ? localStorage.getItem("refreshToken")
                : null;

        if (refreshToken) {
            try {
                // Call refresh token endpoint
                const refreshResult = await baseQuery(
                    {
                        url: "/auth/refresh-token",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    const refreshData =
                        refreshResult.data as RefreshTokenSuccessResponse;

                    // Update access token in localStorage
                    if (
                        typeof window !== "undefined" &&
                        refreshData.data?.accessToken
                    ) {
                        localStorage.setItem(
                            "accessToken",
                            refreshData.data.accessToken
                        );
                    }

                    // Retry the original request with new token
                    const retryResult = await baseQuery(
                        args,
                        api,
                        extraOptions
                    );
                    return retryResult;
                }
            } catch {
                // Refresh failed, clear tokens
                if (typeof window !== "undefined") {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                }
            }
        } else {
            // No refresh token, clear access token
            if (typeof window !== "undefined") {
                localStorage.removeItem("accessToken");
            }
        }
    }

    return result;
};

/**
 * Base API slice for RTK Query
 * This is the main API configuration that all other API slices will extend
 */
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: [
        "Auth",
        "User",
        "Music",
        "Artist",
        "Albums",
        "AdminDonation",
        "Demos",
        "Orders",
        "Plans",
        "SavedMusic",
        "Cart",
        "Product",
        "Review",
    ], // Add more tag types as needed
    endpoints: () => ({}), // Endpoints will be injected by other API slices
});
