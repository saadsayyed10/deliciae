import { create } from "zustand";

interface Handshaking {
  id: string | null;
  setId: (id: string) => void;

  firstName: string | null;
  setFirstName: (firstName: string) => void;

  lastName: string | null;
  setLastName: (lastName: string) => void;

  userType: string | null;
  setUserType: (userType: string) => void;

  email: string | null;
  setEmail: (email: string) => void;

  username: string | null;
  setUsername: (username: string) => void;

  profilePictureUrl: string | null;
  setProfilePictureUrl: (profilePictureUrl: string) => void;

  createdAt: string | null;
  setCreatedAt: (createdAt: string) => void;

  hydrate: () => void;
  reset: () => void;
}

export const useHandshaking = create<Handshaking>((set) => ({
  id: null,
  firstName: null,
  lastName: null,
  userType: null,
  email: null,
  username: null,
  profilePictureUrl: null,
  createdAt: null,

  setId: (id) => {
    localStorage.setItem("id", id);
    set({ id });
  },

  setFirstName: (firstName) => {
    localStorage.setItem("firstName", firstName);
    set({ firstName });
  },

  setLastName: (lastName) => {
    localStorage.setItem("lastName", lastName);
    set({ lastName });
  },

  setUserType: (userType) => {
    localStorage.setItem("userType", userType);
    set({ userType });
  },

  setEmail: (email) => {
    localStorage.setItem("email", email);
    set({ email });
  },

  setUsername: (username) => {
    localStorage.setItem("username", username);
    set({ username });
  },

  setProfilePictureUrl: (profilePictureUrl) => {
    localStorage.setItem("profilePictureUrl", profilePictureUrl);
    set({ profilePictureUrl });
  },

  setCreatedAt: (createdAt) => {
    localStorage.setItem("createdAt", createdAt);
    set({ createdAt });
  },

  hydrate: () => {
    const id = localStorage.getItem("id");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const userType = localStorage.getItem("userType");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const profilePictureUrl = localStorage.getItem("profilePictureUrl");
    const createdAt = localStorage.getItem("createdAt");

    set({
      id: id,
      firstName: firstName,
      lastName: lastName,
      userType: userType,
      email: email,
      username: username,
      profilePictureUrl: profilePictureUrl,
      createdAt: createdAt,
    });
  },

  reset: () => {
    localStorage.removeItem("id");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userType");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("profilePictureUrl");
    localStorage.removeItem("createdAt");

    set({
      id: null,
      firstName: null,
      lastName: null,
      userType: null,
      email: null,
      username: null,
      profilePictureUrl: null,
      createdAt: null,
    });
  },
}));

useHandshaking.getState().hydrate();
