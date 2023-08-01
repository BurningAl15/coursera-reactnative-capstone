import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerScroll: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    backgroundColor: "white",
    alignSelf: "stretch",
    alignItems: "center",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  hero: {
    alignSelf: "stretch",
    padding: 10,
    paddingBottom: 20,
    backgroundColor: "#495E57",
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "flex-end",
  },
  subhero: {
    flexDirection: "column",
    alignItems: "baseline",
    alignSelf: "stretch",
  },
  photo: {
    width: 100,
    height: 140,
    resizeMode: "cover",
    borderRadius: 10,
  },
  search: {
    alignSelf: "stretch",
    backgroundColor: "#495E57",
    marginTop: 0,
    padding: 0,
    borderRadius: 0,
  },
  menuContainer: {
    alignSelf: "stretch",
    width: width - 40,
    marginHorizontal: 20,
    position: "relative",
  },
  menu: {},
  food: {},
  logo: {
    width: 160,
    height: 65,
    resizeMode: "contain",
  },
  item: {
    backgroundColor: "red",
    fontSize: 15,
  },
});
