import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { Calendar, CalendarList, DefaultTheme } from "react-native-calendars";

import DoneButton from "./DoneButton";

const { width, height } = Dimensions.get("window");

import ModalContainer from "./ModalContainer";

// Define a MyDatePicker component that renders the DatePicker component
// and handles the selected date
const DateModal = (props) => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 12,
    today.getDate()
  );
  const maxDateString = maxDate.toISOString().slice(0, 10);
  const todayString = today.toISOString().slice(0, 10);

  const theme = {
    selectedDayBackgroundColor: "green",
  };

  const [markedDates, setMarkedDates] = useState({});

  const getMarkedDates = (firstDate, lastDate) => {
    const startDate = new Date(
      new Date(firstDate).getTime() + 24 * 60 * 60 * 1000
    );
    const endDate = new Date(lastDate);

    const updatedMarkedDates = {};

    updatedMarkedDates[firstDate] = {
      startingDay: true,
      color: "#D7F8D0",
    };

    for (
      let date = startDate;
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      updatedMarkedDates[formattedDate] = {
        color: "#D7F8D0",
      };
    }
    updatedMarkedDates[lastDate] = {
      endingDay: true,
      color: "#D7F8D0",
    };
    return updatedMarkedDates;
  };

  const markeddDates = {
    [props.departureDate]: {
      startingDay: true,

      color: "#D7F8D0",
    },

    [props.returnDate]: {
      endingDay: true,
      color: "#D7F8D0",
    },
  };

  return (
    // Use a View component to wrap the DatePicker component

    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
    >
      <View
        style={{
          width,
          height: height * 0.75,
          borderColor: "#595454",

          borderBottomWidth: 1,
        }}
      >
        <CalendarList
          minDate={todayString}
          maxDate={maxDateString}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={0}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={12}
          onDayPress={(date) => {
            if (
              props.returnDate ||
              props.departureButtonPressed ||
              props.oneWayOrReturnSelected == "One Way"
            ) {
              setMarkedDates({
                [date.dateString]: {
                  startingDay: true,
                  endingDay: true,

                  color: "#D7F8D0",
                },
              });
              props.setDepartureDate(date.dateString);
              props.setDepartureButtonPressed(false);
              props.setReturnDate(false);
            } else {
              setMarkedDates(
                getMarkedDates(props.departureDate, date.dateString)
              );
              props.setReturnDate(date.dateString);
            }
          }}
          markingType={"period"}
          markedDates={markedDates}
          theme={theme}
        />
      </View>
      <Text>{props.departureDate}</Text>
      <Text>{props.returnDate}</Text>
      {props.departureButtonPressed && <Text>Yes</Text>}
      <DoneButton setIsModalOpen={props.setIsModalOpen} marginTop="10%" />
    </ModalContainer>
  );
};

export default DateModal;
