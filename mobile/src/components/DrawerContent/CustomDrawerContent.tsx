import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAuth from "../../providers/hooks/useAuth";
import styles from "./CustomDrawerContent.styles";

const CustomDrawerContent = (props: any) => {
  const { logout } = useAuth();
  return (
    <View style={styles.drawerView}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <DrawerItem
          label="Logout"
          onPress={logout}
          icon={({ size, color }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          )}
        />
      </View>
    </View>
  );
};
export default CustomDrawerContent;
