/**
 * API Configuration
 * Centralized base URL and API endpoints
 *
 * The API base URL is configured via environment variable NEXT_PUBLIC_API_BASE_URL
 * Set it in your .env.local file (see .env.example for reference)
 */

// Get API URL from environment variable, fallback to default if not set
const BACKEND_API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://206.162.244.175:6006/api/v1";

// Use Next.js API proxy in development to avoid CORS issues
// In production, you can use the direct URL if CORS is configured on the backend
export const API_BASE_URL = BACKEND_API_URL; // Direct URL in production (if CORS is configured)

// Export backend URL for proxy route (server-side only)
export const BACKEND_API_BASE_URL = BACKEND_API_URL;

export const API_ENDPOINTS = {
    AUTH: {
        CREATE_ACCOUNT: "/auth/create-account",
        LOGIN: "/auth/login",
        EMAIL_VERIFY: "/auth/email-verify",
        RESEND_OTP: "/auth/resend-otp",
        FORGOT_PASSWORD: "/auth/forgot-password",
        VERIFY_RESET_PASSWORD_OTP: "/auth/verify-reset-password-otp",
        RESET_PASSWORD: "/auth/reset-password",
        REFRESH_TOKEN: "/auth/refresh-token",
        GOOGLE_LOGIN: "/auth/google-login",
        GET_ME: "/users/me",
        // Add more auth endpoints here as needed
    },
    ADMIN: {
        ADD_ARTIST: "/artists",
        ADD_PRODUCT: "/products",
        UPDATE_ARTIST: "/artists",
        DELETE_ARTIST: "/artists",

        GET_PRODUCTS: "/products",
        UPDATE_PRODUCT: "/products",
        DELETE_PRODUCT: "/products",
    },
    COMMON: {
        GET_ARTIST: "/artists",
        GET_SINGLE_ARTIST: "/artists",
        GET_PRODUCTS: "/products",
        GET_ALL_PRODUCTS: "/products",
        ADD_TO_WISHLIST: "/wishlist/toggle",
        GET_WHISH_LIST: "/wishlist",
    },
    USER: {
        ADD_DEMO_ARTIST_SUBMISSION: "/demos/submit",
        GET_DEMO_ARTIST_SUBMISSION: "/demos",
        GET_SINGLE_DEMO_ARTIST_SUBMISSION: "/demos",
        APPROVE_DEMO_ARTIST_SUBMISSION: "/demos/approve",
    },
    ARTIST: {
        ADD_ARTIST: "/artists",
        UPDATE_ARTIST: "/artists",
        GET_ALL_ARTIST: "/artists",
        GET_SINGLE_ARTIST: "/artists",
        DELETE_ARTIST: "/artists",
    },
    ALBUM: {
        ADD_ALBUM: "/music/albums",
        UPDATE_ALBUM: "/albums",
        GET_ALL_ALBUM: "/albums",
        GET_SINGLE_ALBUM: "/albums",
        DELETE_ALBUM: "/albums",
    },
    MUSIC: {
        ADD_MUSIC: "/music/create",
        UPDATE_MUSIC: "/music",
        GET_ALL_MUSIC: "/music",
        GET_SINGLE_MUSIC: "/music",
        DELETE_MUSIC: "/music",
    },
    ADMIN_DONATION: {
        GET_DONATION_STATS: "/analytics/donation-stats",
        GET_DONATION_TRENDS: "/analytics/donation-trends",
        GET_CAMPAING_PERFORMANCE: "/analytics/campaign-performance",
        GET_DONATION_GROWTH: "/analytics/donor-growth",
        GET_DONATIONS: "/subscriptions/donations",
    },
} as const;
