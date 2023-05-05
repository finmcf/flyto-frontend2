import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import ModalContainer from "./ModalContainer";

const { width } = Dimensions.get("window");

const FlightDetailsModal = (props) => {
  const flightOffer = props.flightConfirmation;

  if (!flightOffer || !flightOffer.dictionaries || !flightOffer.data) {
    return null;
  }

  const itineraries = flightOffer.data.flightOffers[0].itineraries;
  const travelerPricings = flightOffer.data.flightOffers[0].travelerPricings;

  const renderSegments = (segments) => {
    return segments.map((segment, index) => {
      const departureAirport =
        flightOffer.dictionaries.locations[segment.departure.iataCode];
      const arrivalAirport =
        flightOffer.dictionaries.locations[segment.arrival.iataCode];
      return (
        <View key={index}>
          <Text>
            {departureAirport.cityCode} ({departureAirport.countryCode}) -{" "}
            {arrivalAirport.cityCode} ({arrivalAirport.countryCode})
          </Text>
          <Text>Duration: {segment.duration}</Text>
          <Text>Airline: {segment.carrierCode}</Text>
        </View>
      );
    });
  };

  const renderItineraries = () => {
    return itineraries.map((itinerary, index) => {
      return (
        <View key={index}>
          <Text style={styles.heading}>
            {index === 0 ? "Outbound" : "Return"}
          </Text>
          {renderSegments(itinerary.segments)}
        </View>
      );
    });
  };

  const renderTravelerPricings = () => {
    const adultCount = travelerPricings.filter(
      (traveler) => traveler.travelerType === "ADULT"
    ).length;
    const childCount = travelerPricings.filter(
      (traveler) => traveler.travelerType === "CHILD"
    ).length;

    return (
      <View>
        <Text style={styles.heading}>Passengers</Text>
        <Text>Adults: {adultCount}</Text>
        {childCount > 0 && <Text>Children: {childCount}</Text>}
      </View>
    );
  };

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
      paddingHorizontal={20}
    >
      <ScrollView contentContainerStyle={styles.modalContent}>
        {renderItineraries()}
        {renderTravelerPricings()}

        <TouchableOpacity style={styles.bookButton} onPress={() => {}}>
          <Text style={styles.bookButtonText}>Book Flight</Text>
        </TouchableOpacity>
      </ScrollView>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  bookButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FlightDetailsModal;
