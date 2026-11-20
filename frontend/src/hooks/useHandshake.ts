import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface HandShaking {
  id: string | null;
  setId: (id: string) => void;

  userType: string | null;
  setUserType: (userType: string) => void;

  reset: () => void;
}

export const useHandshake = create<HandShaking>()(
  persist(
    (set) => ({
      id: null,
      userType: null,

      setId: (id) => {
        set({ id });
      },

      setUserType: (userType) => {
        set({ userType });
      },

      reset: () => {
        set({ id: null, userType: null });
      },
    }),
    {
      name: "handshake-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => {
        id: state.id;
        userType: state.userType;
      },
    },
  ),
);
