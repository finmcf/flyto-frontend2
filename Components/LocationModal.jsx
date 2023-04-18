import React, { useState } from "react";

import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import data from "./airports copy.json";

import ModalContainer from "./ModalContainer";

const LocationModal = (props) => {
  const [suggestions, setSuggestions] = useState([]);

  const { width } = Dimensions.get("window");

  const everywhere = {
    name: "Everywhere",
    iata: "EVERYWHERE",
  };

  const handleSearch = (text) => {
    const filteredData = data.filter((item) => {
      const itemName = item.name.toLowerCase();
      const searchText = text.toLowerCase();
      return itemName.includes(searchText) && item.iata !== props.excludeIata;
    });

    // Add the "Everywhere" option at the top of the list if it hasn't been selected in the other modal
    if (props.excludeIata !== everywhere.iata) {
      setSuggestions([everywhere, ...filteredData]);
    } else {
      setSuggestions(filteredData);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        borderWidth: width * 0.002,
        borderColor: "#afafaf",
        width: "100%",
        paddingVertical: "7%",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        props.setLocation(item.name);
        props.setLocationIata(item.iata);
      }}
    >
      <Text style={{ fontSize: width * 0.1 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
    >
      <TextInput
        placeholder="Search"
        onChangeText={(text) => handleSearch(text)}
      />
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        setLocation={props.setLocation}
        setLocationIata={props.setLocationIata}
      />
    </ModalContainer>
  );
};

export default LocationModal;
