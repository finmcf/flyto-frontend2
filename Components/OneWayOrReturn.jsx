import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

const ChoiceButton = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      borderRadius: width * 0.03,
      marginRight: props.type === "Return" ? "3%" : 0,
      marginLeft: props.type === "One Way" ? "3%" : 0,
      paddingVertical: "3%",
      backgroundColor:
        props.oneWayOrReturnSelected === props.type ? "#D7F8D0" : "#F4F4F4",
    },
    text: {
      fontFamily: "Roboto",
      fontSize: width * 0.045,
      color: props.oneWayOrReturnSelected === props.type ? "#64B154" : "black",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={() => props.setOneWayOrReturnSelected(props.type)}
    >
      <Text style={styles.text}>{props.type}</Text>
    </TouchableOpacity>
  );
};

const OneWayOrReturn = (props) => {
  return (
    <View style={{ flexDirection: "row", marginTop: "15%" }}>
      <ChoiceButton
        type={"Return"}
        oneWayOrReturnSelected={props.oneWayOrReturnSelected}
        setOneWayOrReturnSelected={props.setOneWayOrReturnSelected}
      />

      <ChoiceButton
        type={"One Way"}
        oneWayOrReturnSelected={props.oneWayOrReturnSelected}
        setOneWayOrReturnSelected={props.setOneWayOrReturnSelected}
      />
    </View>
  );
};

export default OneWayOrReturn;
