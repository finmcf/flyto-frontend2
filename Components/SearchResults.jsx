import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import FlightOffer from "./FlightOffers";

const { width, height } = Dimensions.get("window");

const SearchResults = (props) => {
  if (props.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: width * 0.1,
        }}
      >
        <ActivityIndicator size={width * 0.35} color="#64B154" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {props.flightOptions.map((item, index) => {
        const segments = item.itineraries[0].segments;

        const flightInfo = segments.map((segment) => ({
          flightName: `${segment.carrierCode} ${segment.number}`,
          departure: `${segment.departure.iataCode} ${segment.departure.at}`,
          destination: `${segment.arrival.iataCode} ${segment.arrival.at}`,
        }));

        return (
          <TouchableOpacity
            key={item.id}
            style={
              index !== props.flightOptions.length - 1
                ? styles.itemWithSeparator
                : {}
            }
          >
            <FlightOffer
              flightInfo={flightInfo}
              price={`${item.price.currency} ${item.price.total}`}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
  },
  itemWithSeparator: {
    marginBottom: "4%",
  },
});

export default SearchResults;
