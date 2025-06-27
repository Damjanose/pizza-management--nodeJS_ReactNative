import { useContext } from "react";
import { AuthContext } from "../AuthProvider.tsx";

export default () => {
  const contextValue = useContext(AuthContext);

  if (!contextValue)
    throw new Error(
      "Please make sure your component tree is wrapped with AuthProvider component"
    );

  return contextValue;
};
