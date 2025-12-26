"use client";
import { useContext, createContext, useState, ReactNode } from "react";

type AuthMode =
  | "signin"
  | "signup"
  | "forgot-password"
  | "email-verified"
  | "email-verify"
  | "reset-password-otp"
  | "reset-password"
  | null;

type AuthContextType = {
  mode: AuthMode;
  isOpen: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
  openForgotPassword: () => void;
  openEmailVerified: () => void;
  openEmailVerify: (userId: string, userEmail?: string) => void;
  openResetPasswordOtp: (userId: string, userEmail?: string) => void;
  openResetPassword: (accessToken: string) => void;
  close: () => void;
  switchMode: (newMode: AuthMode) => void;
  emailVerifyData: { userId: string; userEmail?: string } | null;
  resetPasswordData: { accessToken: string } | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [emailVerifyData, setEmailVerifyData] = useState<{ userId: string; userEmail?: string } | null>(null);
  const [resetPasswordData, setResetPasswordData] = useState<{ accessToken: string } | null>(null);

  const openSignIn = () => {
    setMode("signin");
    setIsOpen(true);
  };

  const openSignUp = () => {
    setMode("signup");
    setIsOpen(true);
  };

  const openForgotPassword = () => {
    setMode("forgot-password");
    setIsOpen(true);
  };

  const openEmailVerified = () => {
    setMode("email-verified");
    setIsOpen(true);
  };

  const openEmailVerify = (userId: string, userEmail?: string) => {
    setEmailVerifyData({ userId, userEmail });
    setMode("email-verify");
    setIsOpen(true);
  };

  const openResetPasswordOtp = (userId: string, userEmail?: string) => {
    setEmailVerifyData({ userId, userEmail });
    setMode("reset-password-otp");
    setIsOpen(true);
  };

  const openResetPassword = (accessToken: string) => {
    setResetPasswordData({ accessToken });
    setMode("reset-password");
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEmailVerifyData(null);
    setResetPasswordData(null);
    setTimeout(() => setMode(null), 200);
  };

  const switchMode = (newMode: AuthMode) => {
    if (newMode) {
      setMode(newMode);
    } else {
      close();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        mode,
        isOpen,
        openSignIn,
        openSignUp,
        openForgotPassword,
        openEmailVerified,
        openEmailVerify,
        openResetPasswordOtp,
        openResetPassword,
        close,
        switchMode,
        emailVerifyData,
        resetPasswordData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
