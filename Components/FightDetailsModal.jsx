import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ModalContainer from "./ModalContainer";

const FlightDetailsModal = (props) => {
  const flightOffer = props.item;

  if (!flightOffer || !flightOffer.dictionaries || !flightOffer.data) {
    return null;
  }

  const departureAirport =
    flightOffer.dictionaries.locations[
      flightOffer.data.flightOffers[0].itineraries[0].segments[0].departure
        .iataCode
    ];
  const arrivalAirport =
    flightOffer.dictionaries.locations[
      flightOffer.data.flightOffers[0].itineraries[0].segments[1].arrival
        .iataCode
    ];
  const luggage =
    flightOffer.data.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0]
      .includedCheckedBags;
  const cabin =
    flightOffer.data.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0]
      .cabin;
  const duration =
    flightOffer.data.flightOffers[0].itineraries[0].segments[0].duration;
  const airline =
    flightOffer.data.flightOffers[0].itineraries[0].segments[0].carrierCode;

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
      paddingHorizontal={20}
    >
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Luggage</Text>
        <Text>
          {luggage.weight} {luggage.weightUnit} (included)
        </Text>
        <Text style={styles.heading}>Destination</Text>
        <Text>
          {departureAirport.cityCode} ({departureAirport.countryCode}) -{" "}
          {arrivalAirport.cityCode} ({arrivalAirport.countryCode})
        </Text>
        <Text style={styles.heading}>Cabin</Text>
        <Text>{cabin}</Text>
        <Text style={styles.heading}>Duration</Text>
        <Text>{duration}</Text>
        <Text style={styles.heading}>Airline</Text>
        <Text>{airline}</Text>

        <TouchableOpacity style={styles.bookButton} onPress={() => {}}>
          <Text style={styles.bookButtonText}>Book Flight</Text>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
