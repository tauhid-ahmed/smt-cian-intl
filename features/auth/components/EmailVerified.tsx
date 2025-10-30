"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/features/auth/provider/AuthProvider";
import { Heading } from "@/components/Heading";

export default function EmailVerified() {
  const { openForgotPassword } = useAuth();

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-primary" />
      </div>

      <Heading as="h2" size="h5">
        You've got mail!
      </Heading>

      <p className="text-gray-300 text-base max-w-md">
        Please check your inbox. You'll find an email from us explaining how to
        reset your password.
      </p>

      {/* Resend Email Button */}
      <Button onClick={openForgotPassword} size="md" shape="pill">
        Resend Email
      </Button>
    </div>
  );
}
