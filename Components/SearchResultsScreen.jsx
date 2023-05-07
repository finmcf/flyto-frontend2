import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
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
        "http://192.168.1.104:4000/flight-confirmation",
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#64B154" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.flightOptionsContainer}>
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
        </ScrollView>
      </View>
      {props.flightConfirmation && (
        <FlightDetailsModal
          isModalOpen={isFlightDetailModalOpen}
          setIsModalOpen={setIsFlightDetailModalOpen}
          flightConfirmation={props.flightConfirmation}
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
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.05,
  },
  itemWithSeparator: {
    marginBottom: height * 0.02,
  },
  backButton: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.02,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: width * 0.1,
  },

  scrollViewContainer: {
    flex: 1,
  },
  backButtonContainer: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.02,
    zIndex: 2,
  },
  backButton: {},
});

export default SearchResultsScreen;
