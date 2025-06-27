import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAuth from "../../providers/hooks/useAuth.ts";
import styles from "./CustomDrawerContent.styles";

const CustomDrawerContent = (props: any) => {
  const { logout, userData } = useAuth();
  return (
    <View style={styles.drawerView}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.drawerImg}>
          <Image source={{ uri: userData?.image }} style={styles.img} />
          <Text style={styles.text}>{userData?.username}</Text>
        </View>
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
