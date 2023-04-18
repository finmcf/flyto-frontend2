import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
} from "react-native";

import ModalContainer from "./ModalContainer";

import CloseButton from "./CloseButton";

import { Ionicons } from "@expo/vector-icons";

import DoneButton from "./DoneButton";

const { width, height } = Dimensions.get("window");

const PlusButton = (props) => {
  const styles = StyleSheet.create({
    plusButton: {
      backgroundColor: "#64B154",
      height: width * 0.13,
      width: width * 0.13,
      borderRadius: width * 0.065,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <TouchableOpacity
      style={styles.plusButton}
      activeOpacity={0.6}
      onPress={() => {
        props.incrementer(props.counter + 1);
      }}
    >
      <Ionicons name="add" size={width * 0.12} color={"#FFFFFF"} />
    </TouchableOpacity>
  );
};

const MinusButton = (props) => {
  const styles = StyleSheet.create({
    minusButton: {
      backgroundColor: "#EE2A00",
      height: width * 0.13,
      width: width * 0.13,
      borderRadius: width * 0.065,
      alignItems: "center",
      justifyContent: "center",
    },
    disabledMinusButton: { backgroundColor: "#F4F4F4" },
  });
  return (
    <TouchableOpacity
      style={[
        styles.minusButton,
        props.counter == props.minimum && styles.disabledMinusButton,
      ]}
      activeOpacity={0.6}
      onPress={() => {
        props.incrementer(props.counter - 1);
      }}
      disabled={
        props.type === "Adults"
          ? props.counter === 1
            ? true
            : false
          : props.counter === 0
          ? true
          : false
      }
    >
      <Ionicons name="remove" size={width * 0.12} color={"#FFFFFF"} />
    </TouchableOpacity>
  );
};

const PassengerCounter = (props) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",

      marginTop: "25%",
    },
    counterContainer: { flexDirection: "row", marginTop: "7%" },
    text: { fontSize: width * 0.08 },
    passengerCounter: { fontSize: width * 0.11, marginHorizontal: "7%" },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.type}

        {props.type === "Adults" ? "(+12)" : "(0-11)"}
      </Text>

      <View style={styles.counterContainer}>
        <PlusButton counter={props.counter} incrementer={props.incrementer} />
        <Text style={styles.passengerCounter}>{props.counter}</Text>
        <MinusButton
          counter={props.counter}
          incrementer={props.incrementer}
          type={props.type}
          minimum={props.minimum}
        />
      </View>
    </View>
  );
};

const PassengersModal = (props) => {
  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
      paddingHorizontal={"15%"}
    >
      <CloseButton setIsModalOpen={props.setIsModalOpen} />
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: width * 0.1,
          marginTop: "25%",
        }}
      >
        Passengers
      </Text>
      <PassengerCounter
        type={"Adults"}
        counter={props.adults}
        incrementer={props.setAdults}
        minimum={1}
      />

      <PassengerCounter
        type={"Children"}
        counter={props.children}
        incrementer={props.setChildren}
        minimum={0}
      />

      <DoneButton
        setIsModalOpen={props.setIsModalOpen}
        marginTop="20%"
        marginHorizontal={"0%"}
      />
    </ModalContainer>
  );
};

export default PassengersModal;
