import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { getAccessTokenFromEncryptedStorage } from "../../store/auth/token.ts";

const options = {
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      let accessToken = await getAccessTokenFromEncryptedStorage();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken || ""}`,
        } as AxiosRequestHeaders;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default (): AxiosInstance => {
  return axiosInstance;
};
