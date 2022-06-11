import { StyleSheet, View , ScrollView} from "react-native";
import React,{useEffect,useState} from "react";
import CalendarPicker from "react-native-calendar-picker";
import Calendar from "react-native-calendar-range-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import BasePath from '../../constants/BasePath'
import Home from "../../Screens/Home";
import StorageUtils from "../../Utils/StorageUtils";
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
  year: "2022", // letter behind year number -> 2020{year}
};

export default function CalendarInput({navigation ,route}) {
const [marker,setMarker]=useState({})

const setStart=route.params.setStart

useEffect(()=>{
  // AsyncStorage.getItem('user')
  // .then(res=>{
  //   console.log(res);
  //   var x=JSON.parse(res);
  //   axios.post(`${BasePath}/api/request/send`,{id:x.id})
  //   .then(res=>{
  //     console.log(res.data);
  //     var array=res.data
  //     var obj={}
  //     for (var i=0;i<array.length;i++){
  //       var y=array[i].date
  //       console.log(y);
  //       obj[`'${y}'`]={selected: true, selectedColor: 'red'}
  //     }
  //     console.log(obj);
  //     setMarker(obj)
  //   })
  // }

  // )
},[])
  return (
      <View style={styles.containerCalendar}>

      <Calendar
        startDate="2020-05-05"
        singleSelectMode
        onChange={(date) => {
          setStart(date)
          console.log(date);
          StorageUtils.storeData('date',date)
           navigation.goBack()

        }}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  containerCalendar: {
    flex:1,
    backgroundColor:'#D49B35',
    marginTop:100,
  },
  calendar: {
    margin:0,
  },
});