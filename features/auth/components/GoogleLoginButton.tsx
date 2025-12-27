"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useGoogleLoginMutation } from "@/lib/api/authApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { loginSuccess, closeAuthModal } from "@/lib/store/slices/authSlice";
import { useAuth } from "../provider/AuthProvider";
import type { GoogleLoginErrorResponse } from "@/lib/api/authApi";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/Icons";

interface GoogleLoginButtonProps {
  variant?: "light" | "dark";
  text?: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, config: {
            theme?: "outline" | "filled_blue" | "filled_black";
            size?: "large" | "medium" | "small";
            text?: "signin_with" | "signup_with" | "continue_with" | "signin";
            shape?: "rectangular" | "pill" | "circle";
            logo_alignment?: "left" | "center";
            width?: string;
            locale?: string;
          }) => void;
          prompt: (notification?: (notification: { isNotDisplayed: boolean; isSkippedMoment: boolean; isDismissedMoment: boolean }) => void) => void;
        };
      };
    };
  }
}

export default function GoogleLoginButton({ 
  variant = "light",
  text = "Continue with Google"
}: GoogleLoginButtonProps) {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();
  const { close } = useAuth();
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleCredentialResponse = useCallback(async (response: { credential: string }) => {
    if (!response.credential) {
      toast.error("Google login failed: No credential received");
      return;
    }

    try {
      console.log("Google login initiated");

      const result = await googleLogin({
        token: response.credential,
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
  }, [googleLogin, dispatch, close]);

  useEffect(() => {
    // Load Google Identity Services script
    if (typeof window === "undefined") return;

    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogle();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeGoogle();
      };
      document.head.appendChild(script);
    };

    const initializeGoogle = () => {
      if (isInitializedRef.current || !window.google || !buttonContainerRef.current) return;

      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        console.warn("Google Client ID is not set");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      // Render button in hidden container
      try {
        window.google.accounts.id.renderButton(buttonContainerRef.current, {
          theme: variant === "light" ? "outline" : "filled_black",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: "100%",
        });
        isInitializedRef.current = true;
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to render Google button:", error);
      }
    };

    loadGoogleScript();
  }, [variant, handleCredentialResponse]);

  const handleButtonClick = () => {
    // Find and click the rendered Google button
    const googleButton = buttonContainerRef.current?.querySelector('div[role="button"]') as HTMLElement;
    if (googleButton) {
      googleButton.click();
    } else {
      // Fallback: try to find any button
      const button = buttonContainerRef.current?.querySelector('button, [role="button"]') as HTMLElement;
      if (button) {
        button.click();
      } else {
        toast.error("Google login button is not ready. Please try again.");
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* Hidden container for Google button */}
      <div 
        ref={buttonContainerRef}
        className="absolute inset-0 opacity-0 pointer-events-none overflow-hidden"
        style={{ height: '48px', zIndex: 0 }}
      />

      {/* Custom button with original design */}
      <Button
        type="button"
        variant={variant === "light" ? "accent" : "secondary"}
        className={variant === "light" ? "w-full relative z-10" : "flex-1 w-full relative z-10"}
        size="lg"
        onClick={handleButtonClick}
        disabled={isLoading || !isInitialized}
      >
        <GoogleIcon />
        {text}
      </Button>
    </div>
  );
}

