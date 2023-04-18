import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { Calendar, CalendarList, DefaultTheme } from "react-native-calendars";

import DoneButton from "./DoneButton";

const { width, height } = Dimensions.get("window");

import ModalContainer from "./ModalContainer";

import CloseButton from "./CloseButton";
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

  const markedDates = {
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
              props.setDepartureDate(date.dateString);
              props.setDepartureButtonPressed(false);
              props.setReturnDate(false);
            } else {
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
