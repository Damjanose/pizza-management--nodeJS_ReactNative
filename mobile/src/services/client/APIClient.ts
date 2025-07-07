import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROLE } from "../../constants/auth";

const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://192.168.0.175:3000/api";

function buildCurl(config: InternalAxiosRequestConfig): string {
  const method = (config.method || "get").toUpperCase();
  const url = `${config.baseURL || ""}${config.url || ""}`;
  const headers = config.headers
    ? Object.entries(config.headers as Record<string, string>)
        .map(([k, v]) => `-H "${k}: ${v}"`)
        .join(" ")
    : "";
  const data =
    config.data && typeof config.data === "object"
      ? `--data '${JSON.stringify(config.data)}'`
      : "";
  return `curl -X ${method} "${url}" ${headers} ${data}`.trim();
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const role = await AsyncStorage.getItem(ROLE);
    if (role && config.headers) {
      (config.headers as Record<string, string>)["x-role"] = role;
    }
    // console.log(buildCurl(config));
    return config;
  },
  (error) => Promise.reject(error)
);

export default (): AxiosInstance => axiosInstance;
