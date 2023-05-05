import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const FlightOffer = ({ flightInfo, price }) => {
  return (
    <View style={styles.flightOffer}>
      {flightInfo.map((info, index) => (
        <View key={index} style={styles.flightInfoContainer}>
          {info.isReturn && (
            <Text style={styles.returnFlightText}>Return Flight</Text>
          )}
          <Text style={styles.flightName}>{info.flightName}</Text>
          <Text style={styles.departure}>{info.departure}</Text>
          <Text style={styles.destination}>{info.destination}</Text>
          {index !== flightInfo.length - 1 && (
            <Text style={styles.transferText}>Transfer</Text>
          )}
        </View>
      ))}
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.bookNowButton}>Book Now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flightOffer: {
    backgroundColor: "#F4F4F4",
    padding: width * 0.03,
    borderRadius: 8,
    flex: 1,
  },
  flightInfoContainer: {
    marginBottom: height * 0.01,
  },
  flightName: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "black",
    marginBottom: height * 0.01,
  },
  departure: {
    color: "black",
    marginBottom: height * 0.005,
  },
  destination: {
    color: "black",
    marginBottom: height * 0.005,
  },
  transferText: {
    color: "black",
    fontStyle: "italic",
    marginBottom: height * 0.01,
  },
  price: {
    color: "black",
    fontWeight: "bold",
    fontSize: width * 0.05,
    marginTop: height * 0.01,
  },
  bookNowButton: {
    backgroundColor: "#64B154",
    color: "white",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 8,
    textAlign: "center",
    marginTop: height * 0.01,
  },
  returnFlightText: {
    color: "black",
    fontStyle: "italic",
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
  },
});

export default FlightOffer;
