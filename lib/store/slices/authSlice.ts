import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthMode = "signin" | "signup" | "forgot-password" | "email-verified" | null;

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authModal: {
    isOpen: boolean;
    mode: AuthMode;
  };
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  authModal: {
    isOpen: false,
    mode: null,
  },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Auth Modal Actions
    openSignIn: (state) => {
      state.authModal.isOpen = true;
      state.authModal.mode = "signin";
    },
    openSignUp: (state) => {
      state.authModal.isOpen = true;
      state.authModal.mode = "signup";
    },
    openForgotPassword: (state) => {
      state.authModal.isOpen = true;
      state.authModal.mode = "forgot-password";
    },
    openEmailVerified: (state) => {
      state.authModal.isOpen = true;
      state.authModal.mode = "email-verified";
    },
    closeAuthModal: (state) => {
      state.authModal.isOpen = false;
      state.authModal.mode = null;
    },
    switchAuthMode: (state, action: PayloadAction<AuthMode>) => {
      if (action.payload) {
        state.authModal.mode = action.payload;
        state.authModal.isOpen = true;
      } else {
        state.authModal.isOpen = false;
        state.authModal.mode = null;
      }
    },

    // Auth Actions
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.authModal.isOpen = false;
      state.authModal.mode = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  openSignIn,
  openSignUp,
  openForgotPassword,
  openEmailVerified,
  closeAuthModal,
  switchAuthMode,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;

