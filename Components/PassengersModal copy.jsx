import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import ModalContainer from "./ModalContainer";

import CloseButton from "./CloseButton";

import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const PlusButton = (props) => {
  const styles = StyleSheet.create({
    plusButton: {
      height: width * 0.13,
      width: width * 0.13,
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
      disabled={props.total >= 9} // Add disabled property to disable when total >= 9
    >
      <Ionicons name="add" size={width * 0.12} color={props.color} />
    </TouchableOpacity>
  );
};

const MinusButton = (props) => {
  const styles = StyleSheet.create({
    minusButton: {
      height: width * 0.13,
      width: width * 0.13,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <TouchableOpacity
      style={styles.minusButton}
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
      <Ionicons name="remove" size={width * 0.12} color={props.color} />
    </TouchableOpacity>
  );
};

const PassengerCounter = (props) => {
  const counterLength = props.counter.toString().length;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: "25%",
    },
    counterContainer: {
      flexDirection: "row",
      marginTop: "7%",
      backgroundColor: "#F4F4F4",
      height: width * 0.13,
      width: width * (0.39 + (counterLength - 1) * 0.05),
      borderRadius: width * 0.065,
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: { fontSize: width * 0.08 },
    passengerCounter: {
      fontSize: width * 0.11,
      marginHorizontal: "7%",
      alignSelf: "center",
      marginBottom: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.type}
        {props.type === "Adults" ? "(+12)" : "(0-11)"}
      </Text>

      <View style={styles.counterContainer}>
        <PlusButton
          counter={props.counter}
          incrementer={props.incrementer}
          color={"black"}
          total={props.total} // Pass total as a prop
        />
        <Text style={styles.passengerCounter}>{props.counter}</Text>
        <MinusButton
          counter={props.counter}
          incrementer={props.incrementer}
          type={props.type}
          minimum={props.minimum}
          color={"black"}
        />
      </View>
    </View>
  );
};

const PassengersModal = (props) => {
  const total = props.adults + props.children; // Calculate the total

  const styles = StyleSheet.create({
    closeButton: {
      alignItems: "center",
      paddingVertical: 10,
    },
    closeText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
    },
  });

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
      paddingHorizontal={"15%"}
    >
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => props.setIsModalOpen(false)}
      >
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>

      <PassengerCounter
        type={"Adults"}
        counter={props.adults}
        incrementer={props.setAdults}
        minimum={1}
        total={total} // Pass total as a prop
      />

      <PassengerCounter
        type={"Children"}
        counter={props.children}
        incrementer={props.setChildren}
        minimum={0}
        total={total} // Pass total as a prop
      />
    </ModalContainer>
  );
};

export default PassengersModal;
