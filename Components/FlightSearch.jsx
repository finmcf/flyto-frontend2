import React from "react";
import { TouchableOpacity, Text, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const FlightSearch = () => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      backgroundColor: "#64B154",
      borderRadius: width * 0.02,
      paddingVertical: "4%",
      marginTop: "5%",
    },
    text: { color: "white", fontSize: 20 },
  });
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <Text style={styles.text}>Search</Text>
    </TouchableOpacity>
  );
};

export default FlightSearch;
