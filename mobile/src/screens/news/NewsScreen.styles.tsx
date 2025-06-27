import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde3fe",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#007bff",
  },
  cell: {
    paddingHorizontal: 8,
  },
  idCell: {
    flex: 1,
  },
  nameCell: {
    flex: 3,
  },
  actionCell: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
