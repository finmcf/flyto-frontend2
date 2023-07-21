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

import { Ionicons } from "@expo/vector-icons";

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
      fontFamily: "SF-Pro",
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
      fontFamily: "SF-Pro",
      marginLeft: "6%",
      color: "red",
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

const countryCodeToFlag = (countryCode) => {
  if (!countryCode) {
    return ""; // Return an empty string if countryCode is undefined or null
  }

  const OFFSET = 127397;
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => char.charCodeAt() + OFFSET);

  const flagEmoji = String.fromCodePoint(...codePoints);

  console.log("Generated Flag Emoji:", flagEmoji);

  return flagEmoji;
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
          `http://192.168.1.101:4000/city-and-airport-search/${text}`
        );
        const result = await response.json();

        if (result.data) {
          const locations = result.data.map((location) => {
            return {
              name: location.name,
              iata: location.iataCode,
              countryCode: location.address?.countryCode || "",
              subType: location.subType, // Extract the subType
            };
          });

          if (props.excludeIata !== everywhere.iata) {
            setSuggestions([everywhere, ...locations]);
          } else {
            setSuggestions(locations);
          }
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const renderItem = ({ item, index }) => {
    // Determine the icon based on the subType or if the item is "Everywhere"
    const icon =
      item.iata === "EVERYWHERE"
        ? "earth"
        : item.subType === "CITY"
        ? "business"
        : "airplane";

    const formattedName =
      item.iata === "EVERYWHERE"
        ? item.name
        : item.name
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");

    return (
      <TouchableOpacity
        style={{
          borderTopWidth: index === 0 ? 0 : width * 0.002,
          flex: 1,
          borderColor: "#afafaf",
          width: width * 0.9,
          alignSelf: "center",
          paddingVertical: "3%",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={() => {
          props.setLocation(item.name);
          props.setLocationIata(item.iata);
          props.setIsModalOpen(false);
        }}
      >
        <Ionicons
          name={icon}
          size={width * 0.045}
          style={{ marginRight: "2%" }}
        />
        <Text style={{ fontSize: width * 0.045, fontFamily: "SF-Pro" }}>
          {formattedName}
          {item.iata !== "EVERYWHERE" ? ` (${item.iata})` : ""}
          {item.iata !== "EVERYWHERE"
            ? ` ${countryCodeToFlag(item.countryCode)}`
            : ""}
        </Text>
      </TouchableOpacity>
    );
  };

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
