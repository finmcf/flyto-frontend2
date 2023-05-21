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
    topView: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fffefe",
      paddingHorizontal: width * 0.025,
      paddingVertical: width * 0.025,
      width: "100%",
    },
    closeText: {
      fontSize: width * 0.045,
      fontFamily: "SF-Pro",
      marginLeft: "6%",
      color: "red",
    },
    dateContainer: {
      width: width * 0.7,
      height: width * 0.1,
      paddingHorizontal: width * 0.025,
      backgroundColor: "#F4F4F4",
      borderRadius: width * 0.04,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    dateText: {
      fontSize: width * 0.045,
      fontFamily: "SF-Pro",
    },
    arrow: {
      fontSize: width * 0.045,
      fontFamily: "SF-Pro",
      marginHorizontal: 10,
      color: "#64B154",
    },
  });

  const displayDate = (date) => {
    const d = new Date(date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[d.getMonth()];
    const shortMonth = month.substring(0, 3);

    if (props.returnDate) {
      return `${d.getDate()} ${shortMonth} ${String(d.getFullYear()).slice(
        -2
      )}`;
    } else {
      return `${d.getDate()} ${month} ${d.getFullYear()}`;
    }
  };

  const DateDisplay = () => {
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {props.departureDate
            ? displayDate(props.departureDate)
            : "Select departure date"}
        </Text>
        {props.returnDate && (
          <>
            <Text style={styles.arrow}>→</Text>
            <Text style={styles.dateText}>{displayDate(props.returnDate)}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <ModalContainer
      isModalOpen={props.isModalOpen}
      setIsModalOpen={props.setIsModalOpen}
    >
      <View style={styles.topView}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <DateDisplay />
      </View>
      <View style={{ width, height: height * 1 }}>
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
