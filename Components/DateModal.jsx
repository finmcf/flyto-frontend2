import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";

import { CalendarList } from "react-native-calendars";
import ModalContainer from "./ModalContainer";

const { width, height } = Dimensions.get("window");

const DateModal = (props) => {
  const onClose = () => {
    if (
      props.oneWayOrReturnSelected === "Return" &&
      props.departureDate &&
      !props.returnDate
    ) {
      const departureDate = new Date(props.departureDate);
      const returnDate = new Date(
        departureDate.getFullYear(),
        departureDate.getMonth(),
        departureDate.getDate() + 7
      );
      const returnDateString = returnDate.toISOString().slice(0, 10);

      props.setReturnDate(returnDateString);
      setMarkedDates(getMarkedDates(props.departureDate, returnDateString));
    }
    props.setIsModalOpen(false);
  };

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

  useEffect(() => {
    if (
      props.oneWayOrReturnSelected === "Return" &&
      props.departureDate &&
      !props.returnDate
    ) {
      const departureDate = new Date(props.departureDate);
      const returnDate = new Date(
        departureDate.getFullYear(),
        departureDate.getMonth(),
        departureDate.getDate() + 7
      );
      const returnDateString = returnDate.toISOString().slice(0, 10);

      props.setReturnDate(returnDateString);
      setMarkedDates(getMarkedDates(props.departureDate, returnDateString));
    }
  }, [props.oneWayOrReturnSelected]);

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "#00000080",
    },
    calendarContainer: {
      width: "100%",
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
    },
    closeButton: {
      alignSelf: "flex-end",
      marginRight: 10,
    },
    closeButtonText: {
      fontSize: 18,
      color: "red",
    },
  });

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
      style={styles.modalContainer}
    >
      <View style={styles.calendarContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <CalendarList
          minDate={todayString}
          maxDate={maxDateString}
          pastScrollRange={0}
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
              props.setReturnDate(undefined);
            } else if (
              props.departureDate &&
              props.oneWayOrReturnSelected === "Return"
            ) {
              const departureDate = new Date(props.departureDate);
              const selectedDate = new Date(date.dateString);

              if (selectedDate >= departureDate) {
                setMarkedDates(
                  getMarkedDates(props.departureDate, date.dateString)
                );
                props.setReturnDate(date.dateString);
              } else {
                setMarkedDates({
                  [date.dateString]: {
                    startingDay: true,
                    endingDay: true,
                    color: "#D7F8D0",
                  },
                });
                props.setDepartureDate(date.dateString);
                props.setReturnDate(undefined);
              }
            }
          }}
          markingType={"period"}
          markedDates={markedDates}
          theme={theme}
        />
      </View>
    </ModalContainer>
  );
};

export default DateModal;
