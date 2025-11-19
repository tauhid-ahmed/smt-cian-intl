import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";

const BACKEND_URL = process.env.BACKEND_API_URL;

function isCustomUser(user: User): user is Required<User> {
  return (
    "accessToken" in user &&
    "refreshToken" in user &&
    "role" in user &&
    user.accessToken !== undefined &&
    user.refreshToken !== undefined
  );
}

const authConfig: NextAuthConfig = {
  providers: [
    // 🔐 Google OAuth
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔐 GitHub OAuth
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // 🔐 Email/Password Login
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Send credentials to YOUR backend
          const response = await fetch(`${BACKEND_URL}/auth/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) return null;

          const result = await response.json();

          // Backend returns: { success, message, data: { accessToken, refreshToken } }
          if (!result.success || !result.data) return null;

          const { data } = result;

          // Decode JWT to get user info (or fetch from backend)
          const tokenPayload = JSON.parse(
            Buffer.from(data.accessToken.split(".")[1], "base64").toString()
          );

          return {
            id: tokenPayload.id,
            email: tokenPayload.email,
            name: tokenPayload.fullName,
            role: tokenPayload.role,
            emailVerified: tokenPayload.emailVerified ? new Date() : null,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    /**
     * 🎯 JWT CALLBACK - Stores tokens from backend
     * When user logs in, we store backend tokens
     * When token expires, we refresh using backend
     */
    async jwt({ token, user }): Promise<JWT> {
      // Initial sign in - store backend tokens
      if (user && isCustomUser(user)) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = {
          id: user.id,
          email: user.email ?? "",
          name: user.name ?? "",
          role: user.role,
          emailVerified: user.emailVerified ?? null,
        };
      }

      // Token is still valid (backend will reject if expired)
      return token;
    },

    /**
     * 🎯 SESSION CALLBACK - Makes tokens available to frontend
     */
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }

      return session;
    },

    /**
     * 🎯 SIGN IN CALLBACK - For social logins, exchange social token for backend tokens
     */
    async signIn({ user, account }) {
      // If social login (Google, GitHub, etc.)
      if (account && account.provider !== "credentials") {
        try {
          // Send social token to YOUR backend to get your JWT tokens
          const response = await fetch(
            `${BACKEND_URL}/auth/${account.provider}/callback`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                accessToken: account.access_token,
                idToken: account.id_token,
              }),
            }
          );

          if (!response.ok) return false;

          const result = await response.json();

          if (!result.success || !result.data) return false;

          const { data } = result;

          // Decode JWT to get user info
          const tokenPayload = JSON.parse(
            Buffer.from(data.accessToken.split(".")[1], "base64").toString()
          );

          // Update user with backend tokens
          Object.assign(user, {
            id: tokenPayload.id,
            email: tokenPayload.email,
            name: tokenPayload.fullName,
            role: tokenPayload.role,
            emailVerified: tokenPayload.emailVerified ? new Date() : null,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });

          return true;
        } catch (error) {
          console.error("Social login error:", error);
          return false;
        }
      }

      // For credentials login, already handled in authorize
      return true;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const { GET, POST } = handlers;
