import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FlightOffer from "./FlightOffers";
import FlightDetailsModal from "./FightDetailsModal";

const { width, height } = Dimensions.get("window");

const SearchResultsScreen = (props) => {
  const [isFlightDetailModalOpen, setIsFlightDetailModalOpen] = useState(false);

  const sendFlightPricingRequest = async (flight) => {
    try {
      const response = await fetch(
        "http://localhost:4000/flight-confirmation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flight),
        }
      );

      const data = await response.json();
      props.setFlightConfirmation(data);
      setIsFlightDetailModalOpen(true);
    } catch (error) {
      console.error("Error fetching flight pricing:", error);
    }
  };

  const [fetchCounter, setFetchCounter] = useState(0);

  useEffect(() => {
    setFetchCounter((prevCounter) => prevCounter + 1);
  }, [props.flightOptions]);

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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.flightOptionsContainer}>
        {props.flightOptions.map((item, index) => {
          const flightInfo = item.itineraries.flatMap((itinerary, i) => {
            const segments = itinerary.segments;

            return segments.map((segment) => ({
              flightName: `${segment.carrierCode} ${segment.number}`,
              departure: `${segment.departure.iataCode} ${segment.departure.at}`,
              destination: `${segment.arrival.iataCode} ${segment.arrival.at}`,
              isReturn: i === 1,
            }));
          });

          return (
            <TouchableOpacity
              key={`${item.id}-${fetchCounter}`}
              style={
                index !== props.flightOptions.length - 1
                  ? styles.itemWithSeparator
                  : {}
              }
              onPress={() => sendFlightPricingRequest(item)}
            >
              <FlightOffer
                flightInfo={flightInfo}
                price={`${item.price.currency} ${item.price.total}`}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {props.flightConfirmation && (
        <FlightDetailsModal
          isModalOpen={isFlightDetailModalOpen}
          setIsModalOpen={setIsFlightDetailModalOpen}
          item={props.flightConfirmation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "2%",
  },
  flightOptionsContainer: {
    flex: 1,
    marginTop: "10%",
  },
  itemWithSeparator: {
    marginBottom: "4%",
  },
  backButton: {
    position: "absolute",
    top: 2,
    left: 10,
    zIndex: 1,
  },
});

export default SearchResultsScreen;
