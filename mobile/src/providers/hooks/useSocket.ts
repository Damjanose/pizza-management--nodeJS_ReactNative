import { useContext } from "react";
import { SocketContext } from "../SocketProvider";

export default () => {
  const contextValue = useContext(SocketContext);

  if (!contextValue)
    throw new Error(
      "Please make sure your component tree is wrapped with SocketProvider component"
    );

  return contextValue;
};
