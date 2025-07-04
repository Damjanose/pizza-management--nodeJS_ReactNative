import { LoginData } from "./types";
import APIClient from "../client/APIClient";

export const AuthService = {
  login(data: LoginData) {
    return APIClient().post("/login", data);
  },
};
