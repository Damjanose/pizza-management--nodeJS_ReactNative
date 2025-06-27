import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  text: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 18,
    paddingTop: 10,
    color: "#5363df",
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  footer: {
    borderTopColor: "#dde3fe",
    backgroundColor: "#dde3fe",
    borderTopWidth: 1,
    padding: 20,
  },
  contentContainerStyle: {
    backgroundColor: "#dde3fe",
    flex: 1,
  },
  drawerImg: {
    padding: 30,
  },
  drawerView: {
    flex: 1,
  },
});
