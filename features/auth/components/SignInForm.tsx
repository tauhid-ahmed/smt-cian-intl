"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import TextField from "./TextField";
import { Eye, EyeOff } from "lucide-react";
import { FacebookIcon, GoogleIcon } from "@/components/Icons";
import { useAuth } from "../provider/AuthProvider";

const signInSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const { openForgotPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="flex gap-4 items-center">
          <Button
            type="button"
            variant="secondary"
            shape="pill"
            className="flex-1 bg-[#1A77F2] hover:bg-[#1A77F2]/80  text-white"
            size="lg"
          >
            <FacebookIcon />
            Facebook
          </Button>
          <Button
            type="button"
            variant="secondary"
            shape="pill"
            className="flex-1"
            size="lg"
          >
            <GoogleIcon />
            Google
          </Button>
        </div>

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
            disabled={isSubmitting}
            size="md"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
