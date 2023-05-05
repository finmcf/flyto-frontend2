import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import ModalContainer from "./ModalContainer";

const SearchInput = ({ onSearch, onClose, width }) => {
  const [inputText, setInputText] = useState("");

  const styles = StyleSheet.create({
    input: {
      width: width * 0.7,
      height: width * 0.1,
      paddingHorizontal: width * 0.025,
      color: "black",
      backgroundColor: "#F4F4F4",
      borderRadius: width * 0.04,
      fontSize: width * 0.045,
      textAlign: "center",
    },
    topView: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      backgroundColor: "#fffefe",
      paddingHorizontal: width * 0.025,
      paddingVertical: width * 0.025,
      width: "100%",
      position: "relative",
    },
    closeText: {
      fontSize: width * 0.045,
      marginLeft: "6%",
    },
  });

  const handleTextChange = (text) => {
    setInputText(text);
    onSearch(text);
  };

  return (
    <View style={styles.topView}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        onChangeText={handleTextChange}
        value={inputText}
      />
    </View>
  );
};

const LocationModal = (props) => {
  const [suggestions, setSuggestions] = useState([]);

  const { width } = Dimensions.get("window");

  const everywhere = {
    name: "Everywhere",
    iata: "EVERYWHERE",
  };

  const handleSearch = async (text) => {
    if (text.length > 0) {
      try {
        const response = await fetch(
          `http://192.168.1.104:4000/city-and-airport-search/${text}`
        );
        const result = await response.json();

        // Check if result.data is defined before mapping over it
        if (result.data) {
          const locations = result.data.map((location) => {
            return {
              name: location.name,
              iata: location.iataCode,
            };
          });

          if (props.excludeIata !== everywhere.iata) {
            setSuggestions([everywhere, ...locations]);
          } else {
            setSuggestions(locations);
          }
        } else {
          // Handle the case when result.data is undefined

          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        borderTopWidth: index === 0 ? 0 : width * 0.002, // Remove border for the first item
        flex: 1,
        borderColor: "#afafaf",
        width: width * 0.9, // Updated width
        alignSelf: "center", // Align to the center
        paddingVertical: "3%",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        props.setLocation(item.name);
        props.setLocationIata(item.iata);
      }}
    >
      <Text style={{ fontSize: width * 0.06 }}>
        {item.name}
        {item.iata !== "EVERYWHERE" ? ` (${item.iata})` : ""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
    >
      <SearchInput
        onSearch={handleSearch}
        onClose={() => props.setIsModalOpen(false)}
        width={width}
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
