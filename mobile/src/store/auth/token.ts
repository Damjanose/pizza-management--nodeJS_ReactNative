import EncryptedStorage from "react-native-encrypted-storage";
import { ACCESS_TOKEN } from "../../constants/auth.ts";

export const getAccessTokenFromEncryptedStorage = async (): Promise<
  string | void
> => {
  try {
    const role = await EncryptedStorage.getItem(ACCESS_TOKEN);
    if (role) return role;
    return "";
  } catch (e) {
    return "";
  }
};
