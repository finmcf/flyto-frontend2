import React from "react";

import { View } from "react-native";

import PassengersButton from "./PassengersButton";

import ClassButton from "./ClassButton";

const Row4 = (props) => {
  return (
    <View style={{ flexDirection: "row", marginTop: "4%" }}>
      <PassengersButton
        setIsPassengersModalOpen={props.setIsPassengersModalOpen}
        adults={props.adults}
        children={props.children}
      />
      <ClassButton setIsModalOpen={props.setIsClassModalOpen} />
    </View>
  );
};

export default Row4;
