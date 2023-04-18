import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar, Day } from "react-native-calendars";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const minDate = new Date(); // today's date
  const maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  ); // one year from today

  const markedDates = {
    [selectedDate.toISOString().slice(0, 10)]: { selected: true, marked: true },
  };

  const CustomDayComponent = ({ date, state }) => {
    return (
      <Day
        {...state}
        onPress={() => setSelectedDate(new Date(date.timestamp))}
        state={state}
        date={date}
        marking={markedDates}
        style={styles.dayContainer}
        textStyle={styles.dayText}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        onDayPress={(day) => setSelectedDate(new Date(day.timestamp))}
        markedDates={markedDates}
        minDate={minDate}
        maxDate={maxDate}
        hideExtraDays={true}
        renderHeader={(date) => (
          <View style={styles.header}>
            <Text>{date.toString("MMMM yyyy")}</Text>
          </View>
        )}
        theme={{
          selectedDayBackgroundColor: "blue",
          todayTextColor: "blue",
          arrowColor: "blue",
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayFontWeight: "bold", // Increase font weight to make the text larger
        }}
        dayComponent={CustomDayComponent} // Use custom day component
      />
      <Text style={styles.selectedDateText}>
        Selected Date: {selectedDate.toDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  calendar: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    width: "90%",
    height: 350,
    marginBottom: 20,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightgray",
    alignItems: "center",
  },
  dayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 18,
  },
  selectedDateText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomDatePicker;
