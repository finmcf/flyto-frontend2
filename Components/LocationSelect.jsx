import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const LocationSelectButtons = (props) => {
  const styles = StyleSheet.create({
    container: {
      paddingLeft: "4%",
      paddingVertical: "1.2%",
      backgroundColor: "#F4F4F4",

      borderTopLeftRadius: props.type === "Departure" ? width * 0.03 : 0,
      borderTopRightRadius: props.type === "Departure" ? width * 0.03 : 0,
      borderBottomLeftRadius: props.type === "Arrival" ? width * 0.03 : 0,
      borderBottomRightRadius: props.type === "Arrival" ? width * 0.03 : 0,
      borderTopWidth: props.type === "Arrival" ? width * 0.001 : 0,
      borderColor: "#afafaf",
    },
    textsmall: {
      color: "#afafaf",
      fontFamily: "SF-Pro",

      fontSize: width * 0.03,

      marginLeft: "2%",
    },
    textbig: {
      fontSize: width * 0.04,
      fontFamily: "SF-Pro",

      marginLeft: "2%",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => {
        props.onPressFunction(true);
      }}
    >
      <Text style={styles.textsmall}>
        {props.type === "Departure" ? "From" : "To"}
      </Text>

      {props.locationIata ? (
        props.locationIata !== "EVERYWHERE" ? (
          <Text style={styles.textbig}>
            ({props.locationIata}) {props.location}
          </Text>
        ) : (
          <Text style={styles.textbig}>{props.location}</Text>
        )
      ) : (
        <Text style={styles.textbig}>Select departure</Text>
      )}
    </TouchableOpacity>
  );
};

const SwitchButton = (props) => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      zIndex: 10,
      bottom: "30%",
      right: "7%",
      backgroundColor: "#64B154",
      borderRadius: width * 0.055,
      height: width * 0.11,
      width: width * 0.11,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const swapLocations = () => {
    props.setDepartureLocation(props.arrivalLocation);
    props.setArrivalLocation(props.departureLocation);
    props.setDepartureLocationIata(props.arrivalLocationIata);
    props.setArrivalLocationIata(props.departureLocationIata);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={swapLocations}
    >
      <Ionicons
        name="swap-vertical-outline"
        size={width * 0.055}
        color="#F4F4F4"
      />
    </TouchableOpacity>
  );
};

const LocationSelect = (props) => {
  return (
    <View
      style={{
        width: "100%",
        alignItem: "center",
        justifyContent: "center",
        marginTop: "4%",
        zIndex: 1,
      }}
    >
      <SwitchButton
        setDepartureLocation={props.setDepartureLocation}
        setArrivalLocation={props.setArrivalLocation}
        departureLocation={props.departureLocation}
        arrivalLocation={props.arrivalLocation}
        setDepartureLocationIata={props.setDepartureLocationIata}
        setArrivalLocationIata={props.setArrivalLocationIata}
        departureLocationIata={props.departureLocationIata}
        arrivalLocationIata={props.arrivalLocationIata}
      />
      <LocationSelectButtons
        type={"Departure"}
        onPressFunction={props.setIsDepartureLocationModalOpen}
        location={props.departureLocation}
        locationIata={props.departureLocationIata}
      />

      <LocationSelectButtons
        type={"Arrival"}
        onPressFunction={props.setIsArrivalLocationModalOpen}
        location={props.arrivalLocation}
        locationIata={props.arrivalLocationIata}
      />
    </View>
  );
};

export default LocationSelect;
