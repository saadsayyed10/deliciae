import axios from "axios";
import { apiUrl } from "./apiUrl";

export const signUpViewerAPI = async (
  firstName: string,
  lastName: string,
  username: string,
  profilePictureUrl?: string,
) => {
  return axios.post(`${apiUrl}/viewer/signup`, {
    firstName,
    lastName,
    username,
    profilePictureUrl,
  });
};

export const signInViewerAPI = async (username: string) => {
  return axios.post(`${apiUrl}/viewer/signin`, {
    username,
  });
};

export const fetchViewerProfileAPI = async (token: string) => {
  return axios.get(`${apiUrl}/viewer/account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateViewerProfileAPI = async (
  firstName: string,
  lastName: string,
  token: string,
  profilePictureUrl?: string,
) => {
  return axios.put(
    `${apiUrl}/viewer/account`,
    {
      firstName,
      lastName,
      profilePictureUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteViewerProfileAPI = async (token: string) => {
  return axios.delete(`${apiUrl}/viewer/account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
