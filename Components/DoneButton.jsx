import React from "react";

import { TouchableOpacity, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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
        marginTop: props.marginTop,
        marginHorizontal: props.marginHorizontal,
      }}
      onPress={() => props.setIsModalOpen(false)}
    >
      <Text style={{ color: "white", fontSize: 20 }}>Done</Text>
    </TouchableOpacity>
  );
};

export default DoneButton;
