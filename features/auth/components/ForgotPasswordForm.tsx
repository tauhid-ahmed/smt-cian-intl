"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import TextField from "./TextField";
import { useAuth } from "../provider/AuthProvider";
import React from "react";

const forgotPasswordSchema = z.object({
  email: z.string("Invalid email address"),
});

type SignInFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const { openEmailVerified } = useAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log("Form Data:", data);
    } catch (error) {
      console.error(error);
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
          <Button type="submit" disabled={isSubmitting} size="md" shape="pill">
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
