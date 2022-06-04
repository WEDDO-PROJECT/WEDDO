import { StyleSheet, View , ScrollView} from "react-native";
import React from "react";
import Calendar from "react-native-calendar-range-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const setStart=route.params.setStart
  return (
    <ScrollView style={styles.containerCalendar}>
      <Calendar
        style={styles.calendar}
        locale={CUSTOM_LOCALE}
        onChange={({ startDate}) => {
          setStart(startDate)
          AsyncStorage.setItem('startDate',startDate)
           navigation.goBack()
        }}
        pastYearRange={0}
        futureYearRange={1}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerCalendar: {
    flex:1,
    backgroundColor:'#D49B35',
    margin:0,
  },
  calendar: {
    
    margin:0,
  },
});