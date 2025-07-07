import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NewsScreen from "../../screens/news/NewsScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomDrawerContent from "../../components/DrawerContent/CustomDrawerContent";
import { Text, TouchableOpacity, View } from "react-native";

export type DrawerParamList = {
  Home: undefined;
  News: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#dde3fe" },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="list-outline" size={30} color="black" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="home"
                size={30}
                color="black"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
              >
                Dashboard
              </Text>
            </View>
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          drawerLabel: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="newspaper-outline"
                size={30}
                color="black"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
              >
                News
              </Text>
            </View>
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
