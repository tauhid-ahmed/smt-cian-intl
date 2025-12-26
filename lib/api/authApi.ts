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
 * Email Verify Request/Response types
 */
export interface EmailVerifyRequest {
  userId: string;
  otpCode: string;
}

export interface EmailVerifySuccessResponse {
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
    message: string;
  };
}

export interface EmailVerifyErrorResponse {
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

export type EmailVerifyResponse = EmailVerifySuccessResponse | EmailVerifyErrorResponse;

/**
 * Resend OTP Request/Response types
 */
export interface ResendOtpRequest {
  userId: string;
}

export interface ResendOtpSuccessResponse {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    userId: string;
    otpSent: boolean;
    fullName: string;
    message: string;
  };
}

export interface ResendOtpErrorResponse {
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

export type ResendOtpResponse = ResendOtpSuccessResponse | ResendOtpErrorResponse;

/**
 * Forgot Password Request/Response types
 */
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordSuccessResponse {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    id: string;
    fullName: string;
    otpSent: boolean;
    message: string;
    type: "forgotPassword";
  };
}

export interface ForgotPasswordErrorResponse {
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

export type ForgotPasswordResponse = ForgotPasswordSuccessResponse | ForgotPasswordErrorResponse;

/**
 * Verify Reset Password OTP Request/Response types
 */
export interface VerifyResetPasswordOtpRequest {
  userId: string;
  otpCode: string;
}

export interface VerifyResetPasswordOtpSuccessResponse {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface VerifyResetPasswordOtpErrorResponse {
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

export type VerifyResetPasswordOtpResponse = VerifyResetPasswordOtpSuccessResponse | VerifyResetPasswordOtpErrorResponse;

/**
 * Reset Password Request/Response types
 */
export interface ResetPasswordRequest {
  newPassword: string;
  accessToken: string; // Token from verify reset password OTP step
}

export interface ResetPasswordSuccessResponse {
  success: true;
  statusCode: 200;
  message: string;
  data: {
    message: string;
  };
}

export interface ResetPasswordErrorResponse {
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

export type ResetPasswordResponse = ResetPasswordSuccessResponse | ResetPasswordErrorResponse;

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
    emailVerify: builder.mutation<EmailVerifySuccessResponse, EmailVerifyRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.EMAIL_VERIFY,
        method: "POST",
        body,
      }),
    }),
    resendOtp: builder.mutation<ResendOtpSuccessResponse, ResendOtpRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.RESEND_OTP,
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordSuccessResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        method: "POST",
        body,
      }),
    }),
    verifyResetPasswordOtp: builder.mutation<VerifyResetPasswordOtpSuccessResponse, VerifyResetPasswordOtpRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.VERIFY_RESET_PASSWORD_OTP,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordSuccessResponse, ResetPasswordRequest>({
      query: (body) => {
        const { accessToken, ...requestBody } = body;
        
        return {
          url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
          method: "POST",
          body: requestBody,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useCreateAccountMutation, 
  useLoginMutation,
  useEmailVerifyMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useVerifyResetPasswordOtpMutation,
  useResetPasswordMutation,
} = authApi;

