import React from "react";

import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const FaintLine = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: 100,
    height: 30,
    alignItems: "center", // center horizontally
  },
  searchText: { color: "#64B154", fontSize: 20 },
  line: {
    width: "60%",
    height: 1,
    backgroundColor: "#afafaf",
    marginTop: "auto", // move the line to the bottom of the container
    marginBottom: "auto", // move the line to the top of the container
  },
});
export default FaintLine;
