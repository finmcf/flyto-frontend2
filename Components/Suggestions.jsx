import { View, Text } from "react-native";

{
  /*comment here


import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList } from "react-native";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (searchTerm) => {
    // Fetch the search results and update the state
    setSearchResults(results);
  };

  const handleSearchInput = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const handleSearchPress = () => {
    setIsSearchOpen(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSearchPress}>
        <View>
          <TextInput
            placeholder="Search"
            value={searchTerm}
            onChangeText={handleSearchInput}
            editable={isSearchOpen}
          />
        </View>
      </TouchableOpacity>
      {isSearchOpen && (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={setIsSearchOpen(false)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchBar;
*/
}

import React from "react";

const Suggestions = (props) => {
  return <View>{props.isSearchOpen && <View></View>}</View>;
};

export default Suggestions;
