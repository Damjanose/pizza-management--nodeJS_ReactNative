import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde3fe",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
  },
  card: {
    width: 320,
    marginTop: 40,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    padding: 14,
    color: "#444",
    lineHeight: 20,
  },
});
