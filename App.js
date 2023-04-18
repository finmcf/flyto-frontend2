import { Text, View, ScrollView } from "react-native";

import { useState, useEffect } from "react";

import * as Location from "expo-location";

import { findNearest } from "geolib";

import data from "./Components/airports copy.json";

import OneWayOrReturn from "./Components/OneWayOrReturn";

import DateSelectorButtons from "./Components/DateSelectorButtons";

import LocationSelect from "./Components/LocationSelect";

import FlightSearch from "./Components/FlightSearch";

import Row4 from "./Components/Row4";

import PassengersModal from "./Components/PassengersModal copy";

import ClassModal from "./Components/ClassModal";
import DateModal from "./Components/DateModal";

import LocationModal from "./Components/LocationModal";

import SearchResults from "./Components/SearchResults";

export default function App() {
  const formattedDate = new Date().toISOString().slice(0, 10);

  const [departureLocation, setDepartureLocation] = useState("");

  const [arrivalLocation, setArrivalLocation] = useState("");

  const [departureLocationIata, setDepartureLocationIata] = useState("");

  const [arrivalLocationIata, setArrivalLocationIata] = useState("");

  const [isDepartureLocationModalOpen, setIsDepartureLocationModalOpen] =
    useState(false);

  const [isArrivalLocationModalOpen, setIsArrivalLocationModalOpen] =
    useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [returnDate, setReturnDate] = useState(null);

  const [departureButtonPressed, setDepartureButtonPressed] = useState(false);

  const [oneWayOrReturnSelected, setOneWayOrReturnSelected] =
    useState("One Way");

  const [isPassengersModalOpen, setIsPassengersModalOpen] = useState(false);

  const [isClassModalOpen, setIsClassModalOpen] = useState(false);

  const [isDepartureDateModalOpen, setIsDepartureDateModalOpen] =
    useState(false);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [currency, setCurrency] = useState("USD");

  const [routes, setRoutes] = useState([]);

  const [flightOptions, setFlightOptions] = useState([]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  const getClosestAirportAndCurrency = async () => {
    const userLocation = await getLocation();

    const mappedData = data.map(({ latitude, longitude, ...rest }) => ({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      ...rest,
    }));

    const closestAirport = findNearest(userLocation, mappedData, 0, 5);

    return {
      name: closestAirport.name,
      iata: closestAirport.iata,
    };
  };

  const fetchRoutes = async (departureAirportCode) => {
    const response = await fetch(
      `http://localhost:4000/airport-route?departureAirportCode=${departureAirportCode}`
    );
    const json = await response.json();
    const data = json.data;
    setRoutes(data);
  };

  useEffect(() => {
    getClosestAirportAndCurrency().then(({ name, iata }) => {
      setDepartureLocation(name);
      setDepartureLocationIata(iata);
    });
  }, []);

  useEffect(() => {
    if (departureLocationIata === "EVERYWHERE" && arrivalLocationIata) {
      fetchRoutes(arrivalLocationIata);
    }
  }, [departureLocationIata, arrivalLocationIata]);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,

          paddingHorizontal: "8%",
        }}
      >
        <View style={{ paddingHorizontal: "5%" }}>
          <OneWayOrReturn
            oneWayOrReturnSelected={oneWayOrReturnSelected}
            setOneWayOrReturnSelected={setOneWayOrReturnSelected}
          />
          <LocationSelect
            departureLocation={departureLocation}
            arrivalLocation={arrivalLocation}
            departureLocationIata={departureLocationIata}
            arrivalLocationIata={arrivalLocationIata}
            setDepartureLocation={setDepartureLocation}
            setArrivalLocation={setArrivalLocation}
            setDepartureLocationIata={setDepartureLocationIata}
            setArrivalLocationIata={setArrivalLocationIata}
            setIsDepartureLocationModalOpen={setIsDepartureLocationModalOpen}
            setIsArrivalLocationModalOpen={setIsArrivalLocationModalOpen}
          />

          <DateSelectorButtons
            oneWayOrReturnSelected={oneWayOrReturnSelected}
            setIsDepartureDateModalOpen={setIsDepartureDateModalOpen}
            setDepartureButtonPressed={setDepartureButtonPressed}
            departureDate={departureDate}
            returnDate={returnDate}
          />

          <Row4
            setIsPassengersModalOpen={setIsPassengersModalOpen}
            setIsClassModalOpen={setIsClassModalOpen}
            adults={adults}
            children={children}
          />

          <FlightSearch />
        </View>
        <PassengersModal
          isModalOpen={isPassengersModalOpen}
          setIsModalOpen={setIsPassengersModalOpen}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
        />
        <ClassModal
          isModalOpen={isClassModalOpen}
          setIsModalOpen={setIsClassModalOpen}
        />
        <DateModal
          oneWayOrReturnSelected={oneWayOrReturnSelected}
          isModalOpen={isDepartureDateModalOpen}
          setIsModalOpen={setIsDepartureDateModalOpen}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          departureButtonPressed={departureButtonPressed}
          setDepartureButtonPressed={setDepartureButtonPressed}
        />
        <LocationModal
          isModalOpen={isDepartureLocationModalOpen}
          setIsModalOpen={setIsDepartureLocationModalOpen}
          setLocation={setDepartureLocation}
          setLocationIata={setDepartureLocationIata}
          setRoutes={setRoutes}
          excludeIata={arrivalLocationIata}
        />
        <LocationModal
          isModalOpen={isArrivalLocationModalOpen}
          setIsModalOpen={setIsArrivalLocationModalOpen}
          setLocation={setArrivalLocation}
          setLocationIata={setArrivalLocationIata}
          setRoutes={setRoutes}
          excludeIata={departureLocationIata}
        />
        <SearchResults />
      </View>
    </ScrollView>
  );
}
