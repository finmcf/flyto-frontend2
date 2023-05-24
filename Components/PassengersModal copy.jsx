import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalContainer from "./ModalContainer";

const { width } = Dimensions.get("window");

const PlusMinusButton = ({
  isIncrementer,
  color,
  counter,
  incrementer,
  disabled,
}) => {
  const styles = StyleSheet.create({
    button: {
      height: width * 0.13,
      width: width * 0.13,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.6}
      onPress={() => incrementer(isIncrementer ? counter + 1 : counter - 1)}
      disabled={disabled}
    >
      <Ionicons
        name={isIncrementer ? "add" : "remove"}
        size={width * 0.12}
        color={color}
      />
    </TouchableOpacity>
  );
};

const PassengerCounter = ({ type, counter, incrementer, minimum, total }) => {
  const counterLength = counter.toString().length;

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
        {type}
        {type === "Adults" ? "(+12)" : "(0-11)"}
      </Text>

      <View style={styles.counterContainer}>
        <PlusMinusButton
          isIncrementer={true}
          counter={counter}
          incrementer={incrementer}
          color={"black"}
          total={total} // Pass total as a prop
          disabled={total >= 9}
        />
        <Text style={styles.passengerCounter}>{counter}</Text>
        <PlusMinusButton
          isIncrementer={false}
          counter={counter}
          incrementer={incrementer}
          type={type}
          color={"black"}
          disabled={type === "Adults" ? counter === 1 : counter === 0}
        />
      </View>
    </View>
  );
};

const PassengersModal = ({
  isModalOpen,
  setIsModalOpen,
  adults,
  setAdults,
  children,
  setChildren,
}) => {
  const total = adults + children; // Calculate the total

  const styles = StyleSheet.create({
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    infoText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
    },
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
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      paddingHorizontal={"15%"}
    >
      <View style={styles.modalHeader}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsModalOpen(false)}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          Adults: {adults}, Children: {children}
        </Text>
      </View>

      <PassengerCounter
        type={"Adults"}
        counter={adults}
        incrementer={setAdults}
        minimum={1}
        total={total} // Pass total as a prop
      />

      <PassengerCounter
        type={"Children"}
        counter={children}
        incrementer={setChildren}
        minimum={0}
        total={total} // Pass total as a prop
      />
    </ModalContainer>
  );
};

export default PassengersModal;
