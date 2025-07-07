import {ReactNode} from "react";

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

