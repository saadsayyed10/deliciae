import { create } from "zustand";

interface Authentication {
  token: string | null;
  setToken: (token: string) => void;

  hydrate: () => void;
  logout: () => void;
}

export const useAuth = create<Authentication>((set) => ({
  token: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  hydrate: () => {
    const token = localStorage.getItem("token");
    set({ token: token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));

useAuth.getState().hydrate(); // Priority to hydrate the token in any component as soon as the hook is used/imported
