import axios from "axios";
import { useAuthStore } from "../store/useAuthStore.js";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 不发请求，直接清空内存状态
      useAuthStore.setState({ authUser: null });
    }
    return Promise.reject(error);
  }
);
