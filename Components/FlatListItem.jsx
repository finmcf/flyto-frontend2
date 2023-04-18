import React from "react";

import { Text, View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const FlatListItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: { borderWidth: width * 0.003, borderColor: "#afafaf" },

    text: { fontFamily: "Roboto", fontSize: width * 0.09 },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
};

export default FlatListItem;
