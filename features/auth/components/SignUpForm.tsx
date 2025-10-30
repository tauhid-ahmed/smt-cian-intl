"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import TextField from "./TextField";
import { Eye, EyeOff } from "lucide-react";
import { GoogleIcon } from "@/components/Icons";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("Form Data:", data);
      // Add your sign-up logic here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Button type="button" variant="accent" className="w-full" size="lg">
          <GoogleIcon />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Form fields */}
        <TextField name="name" label="Name" variant="light" />
        <TextField name="email" label="Email" variant="light" />
        <div className="relative flex items-center">
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="light"
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

        {/* Toggle show/hide password */}

        {/* No Credit Card Text */}
        {/* <p className="text-center text-gray-500 text-sm">
          No credit card required
        </p> */}

        {/* Submit Button */}
        <Button type="submit" className="w-full h-14" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Start Free Now"}
        </Button>

        {/* Terms
        <p className="text-center text-sm text-gray-600">
          By registering, you agree to the{" "}
          <a href="/terms" className="underline hover:text-gray-900">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-gray-900">
            Privacy Policy
          </a>
        </p> */}
      </form>
    </FormProvider>
  );
}
