import React from "react";

import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CloseButton = (props) => {
  const styles = StyleSheet.create({
    closeButton: {
      zIndex: 1,
      backgroundColor: "#EE2A00",
      height: width * 0.13,
      width: width * 0.13,
      borderRadius: width * 0.065,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "3%",
      left: "8%",
    },
  });
  return (
    <TouchableOpacity
      style={styles.closeButton}
      activeOpacity={0.6}
      onPress={() => props.setIsModalOpen(false)}
    >
      <Ionicons name="close" size={width * 0.12} color={"#FFFFFF"} />
    </TouchableOpacity>
  );
};
export default CloseButton;
