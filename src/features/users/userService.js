// src/features/users/userService.js
import axios from "axios";

export const regUser = async (data) => {
  const response = await axios.post(
    "https://apis-production-b478.up.railway.app/api/users/register-user",
    data
  );
  if (response.data) {
    localStorage.setItem("myUser", JSON.stringify(response.data));
  }
  return response.data;
};

export const logUser = async (data) => {
  const response = await axios.post(
    "https://apis-production-b478.up.railway.app/api/users/login-user",
    data
  );
  if (response.data) {
    localStorage.setItem("myUser", JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("myUser");
};
