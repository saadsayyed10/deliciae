import axios from "axios";
import { apiUrl } from "./apiUrl";

export const signUpAuthorAPI = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  profilePictureUrl?: string,
) => {
  return axios.post(`${apiUrl}/author/signup`, {
    firstName,
    lastName,
    email,
    password,
    profilePictureUrl,
  });
};

export const signInAuthorAPI = async (email: string, password: string) => {
  return axios.post(`${apiUrl}/author/signin`, {
    email,
    password,
  });
};

export const fetchAuthorProfileAPI = async (token: string) => {
  return axios.get(`${apiUrl}/author/signin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAuthorProfileAPI = async (
  firstName: string,
  lastName: string,
  token: string,
  profilePictureUrl?: string,
) => {
  return axios.put(
    `${apiUrl}/author/account`,
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

export const deleteAuthorProfileAPI = async (token: string) => {
  return axios.delete(`${apiUrl}/author/signin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
