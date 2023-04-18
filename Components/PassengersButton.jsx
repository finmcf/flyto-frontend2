import React from "react";

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

import { Ionicons, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const PassengersButton = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      marginRight: "3%",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: "4%",
      paddingVertical: "4%",
      backgroundColor: "#F4F4F4",
      borderRadius: width * 0.03,
    },
    passengers: {
      flexDirection: "row",
      marginHorizontal: "7%",
      alignItems: "center",
    },
    text: { fontSize: width * 0.05, marginRight: "10%" },
  });
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.setIsPassengersModalOpen(true)}
    >
      <View style={styles.passengers}>
        <Text style={styles.text}>{props.adults}</Text>
        <Ionicons name="person" size={width * 0.05} />
      </View>

      <View style={styles.passengers}>
        <Text style={styles.text}>{props.children}</Text>
        <Ionicons name="person" size={width * 0.035} />
      </View>
    </TouchableOpacity>
  );
};

export default PassengersButton;
