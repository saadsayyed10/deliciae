import { create } from "zustand";

interface Authentication {
  token: string | null;
  setToken: (token: string) => void;

  hydrate: () => void;
  logout: () => void;
}

export const useHandshake = create<Authentication>((set) => ({
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
