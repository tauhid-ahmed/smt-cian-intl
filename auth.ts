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
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) return null;

          const data = await response.json();

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            emailVerified: data.user.emailVerified
              ? new Date(data.user.emailVerified)
              : null,
            accessToken: data.tokens.accessToken,
            refreshToken: data.tokens.refreshToken,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
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

      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }

      return session;
    },

    async signIn({ user, account }) {
      if (account && account.provider !== "credentials") {
        try {
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

          const data = await response.json();

          Object.assign(user, {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            emailVerified: data.user.emailVerified
              ? new Date(data.user.emailVerified)
              : null,
            accessToken: data.tokens.accessToken,
            refreshToken: data.tokens.refreshToken,
          });

          return true;
        } catch (error) {
          console.error("Social login error:", error);
          return false;
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const { GET, POST } = handlers;
