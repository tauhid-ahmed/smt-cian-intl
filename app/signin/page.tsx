"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true);

      /**
       * 🎯 SOCIAL LOGIN FLOW:
       * 1. User clicks "Login with Google"
       * 2. NextAuth handles OAuth flow
       * 3. In signIn callback above, we send social token to YOUR backend
       * 4. Your backend returns YOUR JWT tokens
       * 5. NextAuth stores YOUR tokens
       */
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(`${provider} login failed`);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = await getSession();
    console.log("Session:", session);

    try {
      setLoading(true);

      /**
       * 🎯 CREDENTIALS LOGIN FLOW:
       * 1. User enters email/password
       * 2. NextAuth sends to YOUR backend /auth/login
       * 3. Your backend returns YOUR JWT tokens
       * 4. NextAuth stores them
       */

      const result = await signIn("credentials", {
        email: "admin@gmail.com",
        password: "12345678",
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        const session = await getSession();
        if (session) {
          // router.push(callbackUrl);
        }
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-3xl font-bold text-center">Sign in</h2>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
            className="w-full bg-white border py-2 px-4 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Continue with Google
          </button>

          <button
            onClick={() => handleSocialLogin("github")}
            disabled={loading}
            className="w-full bg-white border py-2 px-4 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Continue with GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form className="space-y-6" onSubmit={handleCredentialsLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
