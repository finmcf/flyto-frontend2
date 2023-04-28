import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FlightOffer = ({ flightInfo, price }) => {
  return (
    <View style={styles.flightOffer}>
      {flightInfo.map((info, index) => (
        <View key={index}>
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
  transferText: {
    color: "black",
    fontStyle: "italic",
    marginBottom: 10,
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

  returnFlightText: {
    color: "black",
    fontStyle: "italic",
    marginBottom: 10,
    marginTop: 10,
  },
});

export default FlightOffer;
