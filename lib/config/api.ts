/**
 * API Configuration
 * Centralized base URL and API endpoints
 */

// Use Next.js API proxy in development to avoid CORS issues
// In production, you can use the direct URL if CORS is configured on the backend
export const API_BASE_URL = 
  process.env.NODE_ENV === "development"
    ? "/api/proxy" // Use Next.js proxy in development
    : "http://206.162.244.131:6006/api/v1"; // Direct URL in production (if CORS is configured)

export const API_ENDPOINTS = {
  AUTH: {
    CREATE_ACCOUNT: "/auth/create-account",
    // Add more auth endpoints here as needed
  },
} as const;

