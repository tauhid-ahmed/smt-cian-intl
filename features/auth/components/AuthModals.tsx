"use client";

import { useAuth } from "../provider/AuthProvider";
import AuthCard from "./AuthCard";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import EmailVerified from "./EmailVerified";
import EmailVerifyForm from "./EmailVerifyForm";
import { Button } from "@/components/ui/button";

export default function AuthModals() {
  const { mode, isOpen, close, switchMode, emailVerifyData } = useAuth();

  return (
    <>
      {/* Signup Modal */}
      <AuthCard
        variant="signup"
        title="Create your free account"
        trigger={<span />}
        open={isOpen && mode === "signup"}
        onOpenChange={(open) => !open && close()}
        footer={
          <p className="text-sm text-gray-600">
            Already have an account?
            <Button
              className="px-1!"
              onClick={() => switchMode("signin")}
              variant="link"
            >
              Sign in
            </Button>
          </p>
        }
      >
        <SignUpForm />
      </AuthCard>

      {/* Signin Modal */}
      <AuthCard
        variant="signin"
        title="Sign in"
        trigger={<span />}
        open={isOpen && mode === "signin"}
        onOpenChange={(open) => !open && close()}
        footer={
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <Button
              onClick={() => switchMode("signup")}
              variant="link"
              className="px-1!"
            >
              Sign up
            </Button>
          </p>
        }
      >
        <SignInForm />
      </AuthCard>

      {/* Forgot Password Modal */}
      <AuthCard
        variant="forgot-password"
        title="Reset your password"
        trigger={<span />}
        open={isOpen && mode === "forgot-password"}
        onOpenChange={(open) => !open && close()}
        footer={
          <p className="text-sm text-gray-400">
            Back to{" "}
            <Button
              onClick={() => switchMode("signin")}
              variant="link"
              className="px-1!"
            >
              Sign In
            </Button>
          </p>
        }
      >
        <ForgotPasswordForm />
      </AuthCard>

      {/* Email Verified Success Modal */}
      <AuthCard
        variant="email-verified"
        title=""
        trigger={<span />}
        open={isOpen && mode === "email-verified"}
        onOpenChange={(open) => !open && close()}
      >
        <EmailVerified />
      </AuthCard>

      {/* Email Verify OTP Modal */}
      <AuthCard
        variant="email-verify"
        title="Verify your email"
        trigger={<span />}
        open={isOpen && mode === "email-verify"}
        onOpenChange={(open) => !open && close()}
      >
        {emailVerifyData && (
          <EmailVerifyForm
            userId={emailVerifyData.userId}
            userEmail={emailVerifyData.userEmail}
          />
        )}
      </AuthCard>
    </>
  );
}
