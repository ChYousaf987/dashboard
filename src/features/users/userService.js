// src/features/users/userService.js
import axios from "axios";

export const regUser = async (data) => {
  const response = await axios.post(
    "http://localhost:3001/api/users/register-user",
    data
  );
  if (response.data) {
    localStorage.setItem("myUser", JSON.stringify(response.data));
  }
  return response.data;
};

export const logUser = async (data) => {
  const response = await axios.post(
    "http://localhost:3001/api/users/login-user",
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
