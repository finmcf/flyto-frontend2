import React from "react";

import { TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

const ClassButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.setIsModalOpen(true)}
    >
      <Text style={styles.text}>ECONOMY</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "3%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "4%",
    paddingVertical: "4%",
    backgroundColor: "#F4F4F4",
    borderRadius: width * 0.03,
  },
  text: {
    fontSize: width * 0.05,
  },
});

export default ClassButton;
