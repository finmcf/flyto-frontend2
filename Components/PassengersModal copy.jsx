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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fffefe",
      paddingHorizontal: width * 0.025,
      paddingVertical: width * 0.025,
      width: "100%",
    },
    infoContainer: {
      marginLeft: "6%",
      width: width * 0.7,
      height: width * 0.1,
      paddingHorizontal: width * 0.025,
      backgroundColor: "#F4F4F4",
      borderRadius: width * 0.04,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    closeText: {
      fontSize: width * 0.045,
      fontFamily: "SF-Pro",
      color: "red",
    },
    passengerCounter: {
      fontSize: width * 0.045,
      fontFamily: "SF-Pro",
    },
  });

  return (
    <ModalContainer
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      paddingHorizontal={"0%"}
    >
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => setIsModalOpen(false)}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text
            style={styles.passengerCounter}
          >{`Total Passengers: ${total}`}</Text>
        </View>
      </View>

      <PassengerCounter
        type="Adults"
        counter={adults}
        incrementer={setAdults}
        total={total}
      />
      <PassengerCounter
        type="Children"
        counter={children}
        incrementer={setChildren}
        total={total}
      />
    </ModalContainer>
  );
};

export default PassengersModal;
