"use client";
import { useContext, createContext, useState, ReactNode } from "react";

type AuthMode =
  | "signin"
  | "signup"
  | "forgot-password"
  | "email-verified"
  | null;

type AuthContextType = {
  mode: AuthMode;
  isOpen: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
  openForgotPassword: () => void;
  openEmailVerified: () => void;
  close: () => void;
  switchMode: (newMode: AuthMode) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const close = () => {
    setIsOpen(false);
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
        close,
        switchMode,
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
