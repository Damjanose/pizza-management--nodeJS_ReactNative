import { LoginData, LoginResponse } from "./types";
import APIClient from "../client/APIClient";
import { AxiosResponse } from "axios";

export const AuthService = {
  login(data: LoginData): Promise<AxiosResponse<LoginResponse>> {
    return APIClient().post("/auth/login", data);
  },
};
