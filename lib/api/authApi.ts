import { baseApi } from "./baseApi";
import { API_ENDPOINTS } from "@/lib/config/api";

/**
 * Request/Response types for auth endpoints
 */
export interface CreateAccountRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface CreateAccountSuccessResponse {
  success: true;
  statusCode: 201;
  message: string;
  data: {
    id: string;
    accessToken: string;
    refreshToken: string;
    authType: "register";
  };
}

export interface CreateAccountErrorResponse {
  success: false;
  message: string;
  errorId: string;
  timestamp: string;
  errorMessages: Array<{
    path: string;
    message: string;
  }>;
  stack?: string;
}

export type CreateAccountResponse =
  | CreateAccountSuccessResponse
  | CreateAccountErrorResponse;

/**
 * Login Request/Response types
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    image: string | null;
    status: string;
    isVerified: boolean;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginErrorResponse {
  success: false;
  message: string;
  errorId: string;
  timestamp: string;
  errorMessages: Array<{
    path: string;
    message: string;
  }>;
  stack?: string;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

/**
 * Auth API slice
 * Handles all authentication-related API calls
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation<
      CreateAccountSuccessResponse,
      CreateAccountRequest
    >({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.CREATE_ACCOUNT,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginSuccessResponse, LoginRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useCreateAccountMutation, useLoginMutation } = authApi;

