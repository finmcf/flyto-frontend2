import React, { useRef, useState } from "react";
import {
  PanResponder,
  View,
  Animated,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";

const ModalContainer = (props) => {
  const styles = StyleSheet.create({
    modal: {
      paddingHorizontal: props.paddingHorizontal,

      alignItems: "center",
    },
  });

  const { width, height } = Dimensions.get("window");

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
        props.setIsModalOpen(false);
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
        visible={props.isModalOpen}
        onRequestClose={() => {
          props.setIsModalOpen(false);
        }}
      >
        <Animated.View
          style={[
            styles.modal,
            { transform: [{ translateY: pan.y }] },
            { opacity },
          ]}
        >
          {props.children}
        </Animated.View>
      </Modal>
    </View>
  );
};

export default ModalContainer;
