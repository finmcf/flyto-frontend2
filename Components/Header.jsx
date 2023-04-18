import React from "react";

import { View, Text, Dimensions, StyleSheet } from "react-native";

const Header = () => {
  const { width } = Dimensions.get("window");

  const styles = StyleSheet.create({
    container: { marginTop: "15%" },
    text: { fontFamily: "Roboto" },
  });

  return (
    <View style={styles.container}>
      <Text style={(styles.text, { fontSize: width * 0.1 })}>
        Welcome Back!
      </Text>
      <Text
        style={(styles.text, { fontSize: width * 0.05, marginTop: "1.5%" })}
      >
        Search for your next flight...
      </Text>
    </View>
  );
};

export default Header;
