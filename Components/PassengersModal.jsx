import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  Animated,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CloseButton = (props) => {
  const styles = StyleSheet.create({
    closeButton: {
      zIndex: 1,
      backgroundColor: "#EE2A00",
      height: width * 0.13,
      width: width * 0.13,
      borderRadius: width * 0.065,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "3%",
      left: "8%",
    },
  });
  return (
    <TouchableOpacity
      style={styles.closeButton}
      activeOpacity={0.6}
      onPress={() => props.setIsPassengersModalOpen(false)}
    >
      <Ionicons name="close" size={width * 0.12} color={"#FFFFFF"} />
    </TouchableOpacity>
  );
};

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

const DoneButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width: "100%",
        alignItems: "center",
        backgroundColor: "#64B154",
        borderRadius: width * 0.02,
        paddingVertical: "4%",
        marginTop: "45%",
      }}
      onPress={() => props.setIsPassengersModalOpen(false)}
    >
      <Text style={{ color: "white", fontSize: 20 }}>Done</Text>
    </TouchableOpacity>
  );
};

const PassengersModal = (props) => {
  const styles = StyleSheet.create({
    modal: {
      paddingHorizontal: "15%",

      alignItems: "center",
    },
  });

  const pan = useRef(new Animated.ValueXY({ x: Math.min(0), y: 0 })).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Set up the conditions for when the pan responder should be activated
      return gestureState.dy > 0;
    },
    onPanResponderMove: (event, gestureState) => {
      // Check if swipe gesture is in the downward direction or has not gone beyond the initial y position
      if (gestureState.dy > 0) {
        pan.setValue({ x: 0, y: gestureState.dy });
      }
    },

    onPanResponderRelease: (evt, gestureState) => {
      // Check if the user has swiped the modal downwards enough to close it
      if (gestureState.dy > height * 0.05 && gestureState.vy > 0) {
        props.setIsPassengersModalOpen(false);
        pan.setValue({ x: 0, y: 0 });
      } else {
        // Reset the position of the modal if the user did not swipe down enough to close it
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const opacity = pan.y.interpolate({
    inputRange: [0, height * 0.5],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View {...panResponder.panHandlers}>
      <Modal
        animationType="slide"
        visible={props.isPassengersModalOpen}
        onRequestClose={() => {
          props.setIsPassengersModalOpen(false);
        }}
      >
        <Animated.View
          style={[
            styles.modal,
            { transform: [{ translateY: pan.y }] },
            { opacity },
          ]}
        >
          <CloseButton
            setIsPassengersModalOpen={props.setIsPassengersModalOpen}
          />
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
            setIsPassengersModalOpen={props.setIsPassengersModalOpen}
          />
        </Animated.View>
      </Modal>
    </View>
  );
};

export default PassengersModal;
