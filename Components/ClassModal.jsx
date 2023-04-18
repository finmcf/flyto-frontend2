import React, { useRef, useState } from "react";
import {
  PanResponder,
  View,
  Animated,
  Modal,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import CloseButton from "./CloseButton";

import ModalContainer from "./ModalContainer";

import FlatListItem from "./FlatListItem";

import DoneButton from "./DoneButton";

const flightClasses = [
  { id: "ECONOMY", name: "Class1" },
  { id: "PREMIUM_ECONOMY", name: "Class2" },
  { id: "BUSINESS", name: "Class3" },
  { id: "FIRST", name: "Class4" },
];

const { width } = Dimensions.get("window");

const ClassModal = (props) => {
  const styles = StyleSheet.create({});

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
    >
      <Text style={{ fontSize: width * 0.1 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
      paddingHorizontal={"0%"}
    >
      <CloseButton setIsModalOpen={props.setIsModalOpen} />

      <FlatList
        data={flightClasses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{
          marginTop: "30%",
          width: "100%",
        }}
      />
      <DoneButton
        setIsModalOpen={props.setIsModalOpen}
        marginTop={"20%"}
        marginHorizontal={"50%"}
      />
    </ModalContainer>
  );
};

export default ClassModal;
