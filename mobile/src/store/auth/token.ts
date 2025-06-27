import EncryptedStorage from "react-native-encrypted-storage";
import { ACCESS_TOKEN } from "../../constants/auth.ts";

export const getAccessTokenFromEncryptedStorage = async (): Promise<
  string | void
> => {
  try {
    const token = await EncryptedStorage.getItem(ACCESS_TOKEN);
    if (token) return token;
    return "";
  } catch (e) {
    return "";
  }
};
