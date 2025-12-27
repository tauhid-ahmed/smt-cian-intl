"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleOAuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  if (!clientId) {
    console.warn("Google Client ID is not set. Google login will not work.");
    return <>{children}</>;
  }

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}

