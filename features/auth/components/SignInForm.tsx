"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import TextField from "./TextField";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../provider/AuthProvider";
import { useLoginMutation } from "@/lib/api/authApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { loginSuccess, closeAuthModal } from "@/lib/store/slices/authSlice";
import type { LoginErrorResponse } from "@/lib/api/authApi";
import GoogleLoginButton from "./GoogleLoginButton";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const { openForgotPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log("Submitting login data:", {
        email: data.email,
        password: "***",
      });

      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("Login success response:", result);

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

      // Close modal and reset form
      dispatch(closeAuthModal());
      reset();
    } catch (error: unknown) {
      console.error("Login error:", error);
      console.error("Error details:", {
        error,
        data: (error as { data?: unknown })?.data,
        status: (error as { status?: unknown })?.status,
      });

      // Error case - RTK Query wraps the error in error.data
      const errorObj = error as { data?: unknown; status?: string | number; error?: string };
      const errorData = errorObj?.data || error;
      const errorResponse = errorData as LoginErrorResponse;

      if (errorResponse?.errorMessages && errorResponse.errorMessages.length > 0) {
        // Show the first error message
        toast.error(
          errorResponse.errorMessages[0].message ||
            errorResponse.message ||
            "Login failed"
        );
      } else if (errorResponse?.message) {
        toast.error(errorResponse.message);
      } else if (errorObj?.status === "FETCH_ERROR") {
        toast.error(
          "Network error: Could not connect to server. Please check your connection."
        );
      } else if (errorObj?.status === "CUSTOM_ERROR") {
        toast.error(errorObj?.error || "An error occurred during login");
      } else {
        toast.error("An error occurred during login");
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <GoogleLoginButton variant="dark" />

        {/* Divider */}
        <div className="text-center flex items-center">
          <div className="h-px bg-white/70 flex-1"></div>
          <span className="px-4 text-gray-100">or</span>
          <div className="h-px bg-white/70 flex-1"></div>
        </div>

        {/* Form fields */}
        <TextField name="email" label="Email" variant="dark" />
        <div className="relative flex items-center">
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="dark"
          />
          <Button
            type="button"
            variant="ghost"
            className="text-sm absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-muted-foreground"
            size="icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 mr-1" />
            ) : (
              <Eye className="w-4 h-4 mr-1" />
            )}
          </Button>
        </div>

        <div className="flex justify-between items-center gap-4">
          <Button
            variant="ghost"
            className="px-0!"
            type="button"
            onClick={openForgotPassword}
          >
            Forgot password?
          </Button>
          <Button
            type="submit"
            className="flex-1 px-4 py-2! max-w-36! text-base"
            disabled={isSubmitting || isLoading}
            size="md"
          >
            {isSubmitting || isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
