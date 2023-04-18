import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FlightOffer from "./FlightOffers";

const SearchResults = () => {
  const searchResults = [
    {
      id: 1,
      flightName: "Delta Airlines",
      departure: "New York",
      destination: "Los Angeles",
      price: "$399",
    },
    {
      id: 2,
      flightName: "American Airlines",
      departure: "New York",
      destination: "Miami",
      price: "$249",
    },
    {
      id: 3,
      flightName: "Southwest Airlines",
      departure: "Dallas",
      destination: "Denver",
      price: "$149",
    },
    {
      id: 4,
      flightName: "United Airlines",
      departure: "Chicago",
      destination: "San Francisco",
      price: "$499",
    },
    {
      id: 5,
      flightName: "JetBlue Airways",
      departure: "New York",
      destination: "Orlando",
      price: "$199",
    },
    {
      id: 6,
      flightName: "Alaska Airlines",
      departure: "Seattle",
      destination: "Portland",
      price: "$99",
    },
    {
      id: 7,
      flightName: "Spirit Airlines",
      departure: "Los Angeles",
      destination: "Las Vegas",
      price: "$69",
    },
    {
      id: 8,
      flightName: "Frontier Airlines",
      departure: "Denver",
      destination: "Phoenix",
      price: "$129",
    },
    {
      id: 9,
      flightName: "Hawaiian Airlines",
      departure: "Honolulu",
      destination: "Maui",
      price: "$299",
    },
    {
      id: 10,
      flightName: "Allegiant Air",
      departure: "Las Vegas",
      destination: "San Diego",
      price: "$79",
    },
  ];

  return (
    <View style={styles.container}>
      {searchResults.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={
            index !== searchResults.length - 1 ? styles.itemWithSeparator : {}
          }
        >
          <FlightOffer
            flightName={item.flightName}
            departure={item.departure}
            destination={item.destination}
            price={item.price}
          />
        </TouchableOpacity>
      ))}
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
