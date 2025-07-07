import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const role = await AsyncStorage.getItem("user_role");

      if (role && config.headers) {
        (config.headers as AxiosRequestHeaders)["x-role"] = role;
      }

      const method = config.method?.toUpperCase() || "GET";
      // @ts-ignore
      const url = config.baseURL + config.url;
      const headers = config.headers || {};
      const data = config.data ? `-d '${JSON.stringify(config.data)}'` : "";
      const headerString = Object.entries(headers)
        .map(([k, v]) => `-H "${k}: ${v}"`)
        .join(" ");

      console.log(`curl -X ${method} ${headerString} "${url}" ${data}`);

      return config;
    } catch (error) {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default (): AxiosInstance => axiosInstance;
