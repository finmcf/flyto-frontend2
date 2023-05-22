import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ModalContainer from "./ModalContainer";

const flightClasses = [
  { displayName: "ECONOMY", value: "ECONOMY" },
  { displayName: "PREMIUM ECONOMY", value: "PREMIUM_ECONOMY" },
  { displayName: "BUSINESS", value: "BUSINESS" },
  { displayName: "FIRST", value: "FIRST" },
];

const { width } = Dimensions.get("window");

const ClassModal = (props) => {
  const styles = StyleSheet.create({
    listItem: {
      borderColor: "#afafaf",
      width: width * 0.8,
      alignSelf: "center",
      paddingVertical: "5%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginVertical: width * 0.01,
    },
    text: {
      fontSize: width * 0.07,
    },
    closeText: {
      fontSize: width * 0.045,
      fontFamily: "SF-Pro",
      color: "red",
    },
    topView: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fffefe",
      paddingHorizontal: width * 0.025,
      paddingVertical: width * 0.025,
      width: "100%",
    },
    infoContainer: {
      width: width * 0.7,
      height: width * 0.1,
      paddingHorizontal: width * 0.025,
      backgroundColor: "#F4F4F4",
      borderRadius: width * 0.04,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    selectedClass: {
      fontSize: width * 0.045,
      fontFamily: "SF-Pro",
    },
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        { borderTopWidth: index === 0 ? 0 : width * 0.002 },
      ]}
      onPress={() => {
        props.setTravelClass(item.value);
        props.setIsModalOpen(false);
      }}
    >
      <Text style={styles.text}>{item.displayName}</Text>
    </TouchableOpacity>
  );

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
      paddingHorizontal={"0%"}
    >
      <View style={styles.topView}>
        <TouchableOpacity onPress={() => props.setIsModalOpen(false)}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.selectedClass}>{props.travelClass}</Text>
        </View>
      </View>

      <FlatList
        data={flightClasses}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        style={{
          marginTop: "10%",
          width: "100%",
        }}
      />
    </ModalContainer>
  );
};

export default ClassModal;
