import { Image, StyleSheet, View } from "react-native";

export default () => (
  <View style={styles.container}>
    <Image
      style={styles.img}
      source={require("../../assets/images/splash.png")}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    resizeMode: "contain",
  },
});
