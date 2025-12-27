"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import TextField from "./TextField";
import { useEmailVerifyMutation, useResendOtpMutation } from "@/lib/api/authApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/store/hooks";
import { loginSuccess, closeAuthModal } from "@/lib/store/slices/authSlice";
import type { EmailVerifyErrorResponse } from "@/lib/api/authApi";

const emailVerifySchema = z.object({
  otpCode: z.string().min(4, "OTP must be at least 4 characters").max(6, "OTP must be at most 6 characters"),
});

type EmailVerifyFormData = z.infer<typeof emailVerifySchema>;

interface EmailVerifyFormProps {
  userId: string;
  userEmail?: string;
}

export default function EmailVerifyForm({ userId, userEmail }: EmailVerifyFormProps) {
  const [emailVerify, { isLoading: isVerifying }] = useEmailVerifyMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const dispatch = useAppDispatch();

  const form = useForm<EmailVerifyFormData>({
    resolver: zodResolver(emailVerifySchema),
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

  const onSubmit = async (data: EmailVerifyFormData) => {
    try {
      console.log("Verifying OTP:", {
        userId,
        otpCode: data.otpCode,
      });

      const result = await emailVerify({
        userId,
        otpCode: data.otpCode,
      }).unwrap();

      console.log("OTP verification success:", result);

      // Success case
      toast.success(result.message || "Email verified successfully!");

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
      console.error("OTP verification error:", error);

      const errorObj = error as { data?: unknown; status?: string | number; error?: string };
      const errorData = errorObj?.data || error;
      const errorResponse = errorData as EmailVerifyErrorResponse;

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
            {isSubmitting || isVerifying ? "Verifying..." : "Verify Email"}
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

