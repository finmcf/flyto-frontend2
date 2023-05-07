import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const FlightOffer = ({ flightInfo, price }) => {
  const formatTime = (time) => {
    const date = new Date(time);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const renderStops = (infoList) => {
    const stops = infoList.length - 1;
    if (stops === 0) {
      return "Non-stop";
    }
    return `${stops} stop${stops > 1 ? "s" : ""}`;
  };

  const departureFlights = flightInfo.filter((info) => !info.isReturn);
  const returnFlights = flightInfo.filter((info) => info.isReturn);

  return (
    <View style={styles.flightOffer}>
      <View style={styles.segment}>
        <Text style={styles.departure}>
          {departureFlights[0].departure.split(" ")[0]}{" "}
          {formatTime(departureFlights[0].departure.split(" ")[1])}
        </Text>
        <Text style={styles.stops}>{renderStops(departureFlights)}</Text>
        <Text style={styles.destination}>
          {departureFlights.slice(-1)[0].destination.split(" ")[0]}{" "}
          {formatTime(departureFlights.slice(-1)[0].destination.split(" ")[1])}
        </Text>
      </View>
      {returnFlights.length > 0 && (
        <View style={styles.segment}>
          <Text style={styles.departure}>
            {returnFlights[0].departure.split(" ")[0]}{" "}
            {formatTime(returnFlights[0].departure.split(" ")[1])}
          </Text>
          <Text style={styles.stops}>{renderStops(returnFlights)}</Text>
          <Text style={styles.destination}>
            {returnFlights.slice(-1)[0].destination.split(" ")[0]}{" "}
            {formatTime(returnFlights.slice(-1)[0].destination.split(" ")[1])}
          </Text>
        </View>
      )}
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.bookNowButton}>Book Now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stops: {
    color: "black",
    marginHorizontal: width * 0.02,
  },
  flightOffer: {
    backgroundColor: "#F4F4F4",
    padding: width * 0.03,
    borderRadius: 8,
    flex: 1,
  },
  flightInfoContainer: {
    marginBottom: width * 0.02,
  },
  segment: {
    flexDirection: "row",
    alignItems: "center",
  },
  lineContainer: {
    flex: 1,
  },
  line: {
    height: 2,
    backgroundColor: "#64B154",
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#64B154",
  },
  departure: {
    color: "black",
    marginRight: width * 0.02,
  },
  destination: {
    color: "black",
    marginLeft: width * 0.02,
  },
  returnFlightText: {
    color: "black",
    fontStyle: "italic",
    marginBottom: width * 0.02,
    marginTop: width * 0.02,
  },
  price: {
    color: "black",
    fontWeight: "bold",
    fontSize: width * 0.05,
    marginTop: width * 0.02,
  },
  bookNowButton: {
    backgroundColor: "#64B154",
    color: "white",
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.03,
    borderRadius: 8,
    textAlign: "center",
    marginTop: width * 0.02,
  },
  location: {
    color: "black",
    fontSize: width * 0.03,
    marginBottom: 2,
  },
});

export default FlightOffer;
