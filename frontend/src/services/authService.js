import axiosInstance from "../utils/axiosInstance";
import { AUTH_REGISTER, AUTH_LOGIN, BASE_URL } from "../constants";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(AUTH_REGISTER, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  console.log("Requesting login at:", `${BASE_URL}${AUTH_LOGIN}`, credentials);
  const response = await axiosInstance.post(AUTH_LOGIN, credentials);
  return response.data;
  // const response = await axiosInstance.post(AUTH_LOGIN,credentials);
  // return response.data;
};
