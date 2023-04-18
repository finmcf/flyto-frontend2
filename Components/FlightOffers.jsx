import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FlightOffer = ({ flightName, departure, destination, price }) => {
  return (
    <View style={styles.flightOffer}>
      <Text style={styles.flightName}>{flightName}</Text>
      <Text style={styles.departure}>{departure}</Text>
      <Text style={styles.destination}>{destination}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.bookNowButton}>Book Now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flightOffer: {
    marginRight: 10,
    backgroundColor: "#F4F4F4",
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  flightName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  departure: {
    color: "black",
    marginBottom: 5,
  },
  destination: {
    color: "black",
    marginBottom: 5,
  },
  price: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  bookNowButton: {
    backgroundColor: "#64B154",
    color: "white",
    padding: 5,
    borderRadius: 8,
    textAlign: "center",
    marginTop: 10,
  },
});

export default FlightOffer;
