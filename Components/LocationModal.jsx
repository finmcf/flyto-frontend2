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
import data from "./airports copy.json";
import ModalContainer from "./ModalContainer";

const SearchInput = ({ onSearch, onClose, width }) => {
  const [inputText, setInputText] = useState("");
  const [isCrossVisible, setIsCrossVisible] = useState(false);

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
      backgroundColor: "#F0F0F0",
      paddingHorizontal: width * 0.025,
      paddingVertical: width * 0.025,
      width: "100%",
    },
    closeText: {
      fontSize: width * 0.045,
    },
    crossButton: {
      position: "absolute",
      right: width * 0.04,
      padding: width * 0.01,
    },
  });

  const handleTextChange = (text) => {
    setInputText(text);
    setIsCrossVisible(text.length > 0);
    onSearch(text);
  };

  const handleClearText = () => {
    setInputText("");
    setIsCrossVisible(false);
    onSearch("");
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
      {isCrossVisible && (
        <TouchableOpacity style={styles.crossButton} onPress={handleClearText}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      )}
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

  const handleSearch = (text) => {
    const filteredData = data.filter((item) => {
      const itemName = item.name.toLowerCase();
      const searchText = text.toLowerCase();
      return itemName.includes(searchText) && item.iata !== props.excludeIata;
    });

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
