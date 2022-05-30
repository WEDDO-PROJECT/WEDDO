import { StyleSheet, View , ScrollView} from "react-native";
import React from "react";
import Calendar from "react-native-calendar-range-picker";
const CUSTOM_LOCALE = {
  monthNames: [
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
  ],
  dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
  year: "", // letter behind year number -> 2020{year}
};

export default function CalendarInput({navigation ,route}) {
const {start , end}=route.params
  return (
    <ScrollView style={styles.containerCalendar}>
      <Calendar
        style={styles.calendar}
        locale={CUSTOM_LOCALE}
        onChange={({ startDate, endDate }) => {
          start(startDate)
          end(endDate);
          console.log({start,end})
          {endDate && navigation.goBack()}
        }}
        pastYearRange={0}
        futureYearRange={1}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerCalendar: {
    margin:0,
  },
  calendar: {
    margin:0,
  },
});