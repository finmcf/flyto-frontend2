import React from "react";
import {
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importing Ionicons

const { width } = Dimensions.get("window");

const FlightSearch = (props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row", // Add flexDirection
      justifyContent: "center", // Center items horizontally
      alignItems: "center", // Center items vertically
      width: "100%",
      backgroundColor: "#64B154",
      borderRadius: width * 0.02,
      paddingVertical: "4%",
      marginTop: "5%",
    },
    text: {
      color: "white",
      fontSize: 20,
      fontFamily: "SF-Pro", // Add your font family
      marginRight: 10, // Add some margin to the right of the text
    },
  });

  const handleSearchPress = () => {
    if (
      props.departureLocationIata !== "EVERYWHERE" &&
      props.arrivalLocationIata !== "EVERYWHERE"
    ) {
      props.singleFlightSearch();
    } else {
      props.everyWhereFlightSearch();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={handleSearchPress}
    >
      <Text style={styles.text}>Search Flights</Text>
      <Ionicons name="airplane-outline" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default FlightSearch;
