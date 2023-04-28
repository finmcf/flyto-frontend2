import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, ScrollView, Animated } from "react-native";

import { useState, useEffect, useRef } from "react";
import FlightSearchScreen from "./FlightSearchScreen";
import SearchResultsScreen from "./Components/SearchResultsScreen";

const Stack = createStackNavigator();

const App = () => {
  const [flightOptions, setFlightOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [flightConfirmation, setFlightConfirmation] = useState([]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FlightSearchScreen">
        <Stack.Screen name="FlightSearchScreen">
          {(props) => (
            <FlightSearchScreen
              {...props}
              setIsLoading={setIsLoading}
              setFlightOptions={setFlightOptions}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SearchResultsScreen">
          {(props) => (
            <SearchResultsScreen
              {...props}
              isLoading={isLoading}
              flightOptions={flightOptions}
              flightConfirmation={flightConfirmation}
              setFlightConfirmation={setFlightConfirmation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
