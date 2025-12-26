"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import TextField from "./TextField";
import { useResetPasswordMutation } from "@/lib/api/authApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { closeAuthModal } from "@/lib/store/slices/authSlice";
import type { ResetPasswordErrorResponse } from "@/lib/api/authApi";
import { useAuth } from "../provider/AuthProvider";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  accessToken: string;
}

export default function ResetPasswordForm({ accessToken }: ResetPasswordFormProps) {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const dispatch = useAppDispatch();
  const { openSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      console.log("Resetting password");

      const result = await resetPassword({
        newPassword: data.newPassword,
        accessToken,
      }).unwrap();

      console.log("Password reset success:", result);

      // Success case
      toast.success(result.message || "Password reset successfully!");

      // Clear the temporary token
      localStorage.removeItem("resetPasswordToken");

      // Close modal and reset form
      dispatch(closeAuthModal());
      reset();

      // Open sign in modal
      setTimeout(() => {
        openSignIn();
        toast.success("Please login with your new password");
      }, 500);
    } catch (error: unknown) {
      console.error("Password reset error:", error);

      const errorObj = error as { data?: unknown; status?: string | number; error?: string };
      const errorData = errorObj?.data || error;
      const errorResponse = errorData as ResetPasswordErrorResponse;

      if (errorResponse?.errorMessages && errorResponse.errorMessages.length > 0) {
        toast.error(
          errorResponse.errorMessages[0].message ||
            errorResponse.message ||
            "Password reset failed"
        );
      } else if (errorResponse?.message) {
        toast.error(errorResponse.message);
      } else {
        toast.error("An error occurred during password reset");
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-center text-gray-300 mb-6">
          Please enter your new password below.
        </p>

        <div className="relative flex items-center">
          <TextField
            name="newPassword"
            label="New Password"
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

        <div className="relative flex items-center">
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="dark"
          />
          <Button
            type="button"
            variant="ghost"
            className="text-sm absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-muted-foreground"
            size="icon"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4 mr-1" />
            ) : (
              <Eye className="w-4 h-4 mr-1" />
            )}
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          size="md"
          shape="pill"
          className="w-full"
        >
          {isSubmitting || isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </FormProvider>
  );
}

