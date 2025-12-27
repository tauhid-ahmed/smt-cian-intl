"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import TextField from "./TextField";
import { useAuth } from "../provider/AuthProvider";
import { useForgotPasswordMutation } from "@/lib/api/authApi";
import toast from "react-hot-toast";
import type { ForgotPasswordErrorResponse } from "@/lib/api/authApi";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const { openResetPasswordOtp } = useAuth();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log("Submitting forgot password:", data);

      const result = await forgotPassword({
        email: data.email,
      }).unwrap();

      console.log("Forgot password success:", result);

      // Success case - OTP sent
      toast.success(result.message || "OTP sent successfully to your email!");

      // Reset form and open reset password OTP modal
      reset();
      openResetPasswordOtp(result.data.id, data.email);
    } catch (error: unknown) {
      console.error("Forgot password error:", error);

      const errorObj = error as { data?: unknown; status?: string | number; error?: string };
      const errorData = errorObj?.data || error;
      const errorResponse = errorData as ForgotPasswordErrorResponse;

      if (errorResponse?.errorMessages && errorResponse.errorMessages.length > 0) {
        toast.error(
          errorResponse.errorMessages[0].message ||
            errorResponse.message ||
            "Failed to send OTP"
        );
      } else if (errorResponse?.message) {
        toast.error(errorResponse.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-center">
          Enter your email address and we’ll send you a link to reset your
          password
        </p>
        <TextField name="email" label="Email" variant="dark" />

        <div className="flex justify-center">
          <Button type="submit" disabled={isSubmitting || isLoading} size="md" shape="pill">
            {isSubmitting || isLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
