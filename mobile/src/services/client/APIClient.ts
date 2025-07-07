import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://192.168.0.175:3000/api";

function buildCurl(config: InternalAxiosRequestConfig): string {
  const method = (config.method || "get").toUpperCase();
  const url = (config.baseURL || "") + (config.url || "");
  const headers = config.headers
    ? Object.entries(config.headers as Record<string, string>)
        .map(([k, v]) => `-H "${k}: ${v}"`)
        .join(" ")
    : "";
  const data = config.data ? `-d '${JSON.stringify(config.data)}'` : "";
  return `curl -X ${method} ${headers} "${url}" ${data}`;
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
  async (config) => {
    const role = await AsyncStorage.getItem("user_role");
    if (role && config.headers) {
      (config.headers as AxiosRequestHeaders)["x-role"] = role;
    }

    console.log(buildCurl(config));
    return config;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [${response.status}] ${response.config.url}`,
      "– use the same curl above to reproduce"
    );
    return response;
  },
  (error) => {
    if (error.config) {
      console.warn("❌ [Axios CURL on Error] ", buildCurl(error.config));
    }
    if (error.response) {
      console.warn(
        `❌ [Error Response] ${error.response.status}`,
        error.response.data
      );
    } else if (error.request) {
      console.warn(
        "❌ [No Response] request sent but no response received",
        error.request
      );
    } else {
      console.error("❌ [Setup Error]", error.message);
    }
    return Promise.reject(error);
  }
);

export default (): AxiosInstance => axiosInstance;
