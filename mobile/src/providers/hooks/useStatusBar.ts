import { useContext } from "react";
import { StatusBarContext } from "../StatusBarProvider";

export default () => {
  const contextValue = useContext(StatusBarContext);

  if (!contextValue) {
    throw new Error(
      "Please make sure your component tree is wrapped with StatusBarProvider component"
    );
  }

  return contextValue;
};
