import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export interface ChildrenProp {
  children?: ReactNode;
}

export type TStatusBarContext = {
  isDarkMode: boolean;
  setAsOSSettings: () => void;
  setToDark: () => void;
  setToLight: () => void;
};
export type TBarStyle = "light-content" | "dark-content";

export type TSocketContext = {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
  emitEvent: (eventName: string, data?: any) => void;
};
