export type UserRole = "user" | "admin" | "superadmin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  emailVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface BackendAuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface CredentialsLoginRequest {
  email: string;
  password: string;
}
