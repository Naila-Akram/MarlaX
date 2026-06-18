import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}
interface AuthState {
  user: any;
  isAuthenticated: boolean;

  signIn: (user: any) => void;
  signOut: () => void;
}

export const useAppStore = create<AppState>(set => ({
  isLoading: false,
  setLoading: (value: boolean) => set({ isLoading: value }),
}));

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,

  signIn: user =>
    set({
      user,
      isAuthenticated: true,
    }),

  signOut: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
