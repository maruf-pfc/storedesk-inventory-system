import { create } from "zustand";

import type { AuthUser } from "../types/auth";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    localStorage.setItem("storedesk_user", JSON.stringify(user));

    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("storedesk_user");

    set({
      user: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: () => {
    const storedUser = localStorage.getItem("storedesk_user");

    if (!storedUser) {
      return;
    }

    const user = JSON.parse(storedUser);

    set({
      user,
      isAuthenticated: true,
    });
  },
}));
