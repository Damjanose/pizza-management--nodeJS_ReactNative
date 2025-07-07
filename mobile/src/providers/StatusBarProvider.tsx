import React, { createContext, useCallback, useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "../styles/colors";
import { ChildrenProp, TBarStyle, TStatusBarContext } from "./types";

export const StatusBarContext = createContext<TStatusBarContext | null>(null);

export const StatusBarProvider = ({ children }: ChildrenProp) => {
  const isDarkMode = useColorScheme() === "dark";
  const [barStyle, setBarStyle] = useState<TBarStyle>("dark-content");
  const [backgroundColor, setBackgroundColor] = useState<string>(
    Colors.paperWhite
  );

  const applyLightMode = useCallback(async () => {
    setBarStyle("dark-content");
    setBackgroundColor(Colors.paperWhite);
    changeNavigationBarColor(Colors.paperWhite, true, false);
  }, []);

  const applyDarkMode = useCallback(async () => {
    setBarStyle("light-content");
    setBackgroundColor(Colors.paperBlack);
    changeNavigationBarColor(Colors.paperBlack, false, false);
  }, []);

  const setAsOSSettings = useCallback(async () => {
    if (isDarkMode) {
      await applyDarkMode();
    } else {
      await applyLightMode();
    }
  }, [isDarkMode, applyDarkMode, applyLightMode]);

  useEffect(() => {
    setAsOSSettings();
  }, [setAsOSSettings]);

  return (
    <StatusBarContext.Provider
      value={{
        setToDark: applyDarkMode,
        setToLight: applyLightMode,
        isDarkMode,
        setAsOSSettings,
      }}
    >
      <StatusBar
        animated
        translucent={false}
        hidden={false}
        barStyle={barStyle}
        backgroundColor={backgroundColor}
      />

      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
          {children}
        </SafeAreaView>
      </SafeAreaProvider>
    </StatusBarContext.Provider>
  );
};
