import React from "react";

import { useState } from "react";

import { View, TouchableOpacity, TextInput, Text } from "react-native";

const Search = (props) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <TouchableOpacity>
      <View>
        <Text>hello</Text>
        <TextInput
          onFocus={() => props.setIsSearchOpen(true)}
          placeholder="Search"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Search;
