import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Handshaking {
  id: string | null;
  setId: (id: string) => void;

  firstName: string | null;
  setFirstName: (firstName: string) => void;

  lastName: string | null;
  setLastName: (lastName: string) => void;

  email: string | null;
  setEmail: (email: string) => void;

  username: string | null;
  setUsername: (username: string) => void;

  profilePictureUrl: string | null;
  setProfilePictureUrl: (profilePictureUrl: string) => void;

  createdAt: string | null;
  setCreatedAt: (createdAt: string) => void;
}

export const useHandshaking = create<Handshaking>()(
  persist(
    (set) => ({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      profilePictureUrl: null,
      createdAt: null,

      setId: (id) => {
        set({ id });
      },

      setFirstName: (firstName) => {
        set({ firstName });
      },

      setLastName: (lastName) => {
        set({ lastName });
      },

      setEmail: (email) => {
        set({ email });
      },

      setUsername: (username) => {
        set({ username });
      },

      setProfilePictureUrl: (profilePictureUrl) => {
        set({ profilePictureUrl });
      },

      setCreatedAt: (createdAt) => {
        set({ createdAt });
      },
    }),
    {
      name: "handshaking-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => {
        id: state.id;
        firstName: state.firstName;
        lastName: state.lastName;
        email: state.email;
        username: state.username;
        profilePictureUrl: state.profilePictureUrl;
        createdAt: state.createdAt;
      },
    },
  ),
);
