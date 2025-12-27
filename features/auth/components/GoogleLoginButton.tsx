"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useGoogleLoginMutation } from "@/lib/api/authApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { loginSuccess, closeAuthModal } from "@/lib/store/slices/authSlice";
import { useAuth } from "../provider/AuthProvider";
import type { GoogleLoginErrorResponse } from "@/lib/api/authApi";

interface GoogleLoginButtonProps {
  variant?: "light" | "dark";
}

export default function GoogleLoginButton({ variant = "light" }: GoogleLoginButtonProps) {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();
  const { close } = useAuth();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("Google login failed: No credential received");
      return;
    }

    try {
      console.log("Google login initiated");

      const result = await googleLogin({
        token: credentialResponse.credential,
      }).unwrap();

      console.log("Google login success:", result);

      // Success case
      toast.success(result.message || "Logged in successfully!");

      // Store user data in Redux
      dispatch(
        loginSuccess({
          id: result.data.id,
          name: result.data.fullName,
          email: result.data.email,
        })
      );

      // Store tokens in localStorage
      if (result.data.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
      }

      // Close modal
      dispatch(closeAuthModal());
      close();
    } catch (error: unknown) {
      console.error("Google login error:", error);

      const errorObj = error as { data?: unknown; status?: string | number; error?: string };
      const errorData = errorObj?.data || error;
      const errorResponse = errorData as GoogleLoginErrorResponse;

      if (errorResponse?.errorMessages && errorResponse.errorMessages.length > 0) {
        toast.error(
          errorResponse.errorMessages[0].message ||
            errorResponse.message ||
            "Google login failed"
        );
      } else if (errorResponse?.message) {
        toast.error(errorResponse.message);
      } else if (errorObj?.status === "FETCH_ERROR") {
        toast.error(
          "Network error: Could not connect to server. Please check your connection."
        );
      } else {
        toast.error("Google login failed");
      }
    }
  };

  const handleError = () => {
    toast.error("Google login failed");
  };

  return (
    <div className="w-full [&>div]:w-full [&>div>div]:w-full">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleError}
        useOneTap={false}
        theme={variant === "light" ? "outline" : "filled_black"}
        size="large"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
}

