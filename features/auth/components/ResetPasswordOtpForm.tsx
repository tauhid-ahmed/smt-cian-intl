"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import TextField from "./TextField";
import { useVerifyResetPasswordOtpMutation, useResendOtpMutation } from "@/lib/api/authApi";
import toast from "react-hot-toast";
import type { VerifyResetPasswordOtpErrorResponse } from "@/lib/api/authApi";
import { useAuth } from "../provider/AuthProvider";

const resetPasswordOtpSchema = z.object({
  otpCode: z.string().min(4, "OTP must be at least 4 characters").max(6, "OTP must be at most 6 characters"),
});

type ResetPasswordOtpFormData = z.infer<typeof resetPasswordOtpSchema>;

interface ResetPasswordOtpFormProps {
  userId: string;
  userEmail?: string;
}

export default function ResetPasswordOtpForm({ userId, userEmail }: ResetPasswordOtpFormProps) {
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyResetPasswordOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const { openResetPassword } = useAuth();

  const form = useForm<ResetPasswordOtpFormData>({
    resolver: zodResolver(resetPasswordOtpSchema),
    mode: "onBlur",
    defaultValues: {
      otpCode: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: ResetPasswordOtpFormData) => {
    try {
      console.log("Verifying reset password OTP:", {
        userId,
        otpCode: data.otpCode,
      });

      const result = await verifyOtp({
        userId,
        otpCode: data.otpCode,
      }).unwrap();

      console.log("OTP verification success:", result);

      // Success case - store accessToken and open reset password form
      toast.success(result.message || "OTP verified successfully!");
      
      // Store the accessToken temporarily for reset password
      if (result.data.accessToken) {
        localStorage.setItem("resetPasswordToken", result.data.accessToken);
      }

      // Reset form and open reset password modal
      reset();
      openResetPassword(result.data.accessToken);
    } catch (error: unknown) {
      console.error("OTP verification error:", error);

      const errorObj = error as { data?: unknown; status?: string | number; error?: string };
      const errorData = errorObj?.data || error;
      const errorResponse = errorData as VerifyResetPasswordOtpErrorResponse;

      if (errorResponse?.errorMessages && errorResponse.errorMessages.length > 0) {
        toast.error(
          errorResponse.errorMessages[0].message ||
            errorResponse.message ||
            "OTP verification failed"
        );
      } else if (errorResponse?.message) {
        toast.error(errorResponse.message);
      } else {
        toast.error("An error occurred during OTP verification");
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      const result = await resendOtp({ userId }).unwrap();
      toast.success(result.message || "OTP resent successfully!");
    } catch (error: unknown) {
      console.error("Resend OTP error:", error);
      const errorObj = error as { data?: unknown };
      const errorData = errorObj?.data || error;
      const errorResponse = errorData as { message?: string };

      toast.error(errorResponse?.message || "Failed to resend OTP");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-center text-gray-300 mb-10">
          {userEmail
            ? `We've sent a verification code to ${userEmail}. Please enter the code below.`
            : "We've sent a verification code to your email. Please enter the code below."}
        </p>

        <TextField
          name="otpCode"
          label="OTP Code"
          variant="dark"
          placeholder=""
        />

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={isSubmitting || isVerifying}
            size="md"
            shape="pill"
            className="w-full"
          >
            {isSubmitting || isVerifying ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handleResendOtp}
            disabled={isResending}
            size="md"
            className="w-full"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

