import { StyleSheet, View ,Text, ScrollView,TouchableOpacity} from "react-native";
import React,{useEffect,useState} from "react";
// import Calendar from "react-native-calendar-range-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import BasePath from '../constants/BasePath'

import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import StorageUtils from "../Utils/StorageUtils";
import moment from 'moment';
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

export default function CalendarInput({navigation ,route}) {
const [marker,setMarker]=useState({})

const [look,setLook] = useState(0)
const [user,setUser] = useState({})
const [view,setView] = useState(null)
const [request,setRequest] = useState(null)
const [requests,setRequests] = useState([])
useEffect(()=>{
  StorageUtils.retrieveData('user')
  .then(res=>{
    var x=JSON.parse(res);
    axios.post(`${BasePath}/api/sp/request/getAllByIdSp`,{id:x.id})
    .then(res=>{
      var array=res.data
      setRequests(res.data)
      
      var obj={}
      for (var i=0;i<array.length;i++){
        if(array[i].confirme){
            var y=moment(JSON.parse(array[i].date)).format("YYYY-MM-DD");
            obj[`${y}`]={selected: true, selectedColor: 'green'}
        }else{
          var y=moment(JSON.parse(array[i].date)).format("YYYY-MM-DD");
          obj[`${y}`]={selected: true, selectedColor: 'red'}
        }
      }
      //console.log(obj);
      setMarker(obj)
    })
  }

  )
},[request])
const confirm=()=>{
  console.log(1);
  axios.post(BasePath+'/api/sp/request/update',request)
  .then(res=>{
    if (res.data=='result'){
      setRequest(null)
      setLook(0)
    }
  })
  }
  const del=(elem)=>{
    var obj={
        user_id:elem.user_id,
        sp_id:elem.sp_id,
        date:elem.date
    }
    console.log(obj)
    axios.post(`${BasePath}/api/sp/request/delete`,obj)
    .then((res) =>{
        setRequest(null)
        setLook(0)
        setUser({})
    })

}

const update = (day)=> {
    setView(2)
      let y=0
      for (var i=0;i<requests.length;i++) {
        
        if(JSON.parse(requests[i].date)===day.dateString){
          
          setRequest(requests[i])
          console.log("google "+requests[i].user_id);
          if(requests[i].confirme===null){
            y=1
            setLook(y)
            setView(1)
          }else{
            setView(1)
          }
          axios.post(BasePath+'/api/sp/oneUser',{id:requests[i].user_id})
          .then(res=>{
            setUser(res.data[0])
          })
        }
        
      }
      
  
}

  return (
    <ScrollView style={styles.containerCalendar}>
      <Calendar
  // Collection of dates that have to be marked. Default = {}
  markedDates={marker}
  onDayPress={(day)=>update(day)}
/>
{view==1&&<View>
  <Text>
  {user.name}
  </Text>
  <Text>
  {user.tel_number}
  </Text>
  <Text>
  {user.email}
  </Text>
  
  </View>}
  {look==1&&view==1&&<View>
  <TouchableOpacity style={{backgroundColor:'green'}} onPress={()=>confirm()} >
  <Text>
  Confirme
  </Text>
  </TouchableOpacity>
  <TouchableOpacity style={{backgroundColor:'red'}} onPress={()=>del(request)} >
  <Text>
  Cancel
  </Text>
  </TouchableOpacity>
  </View>}
{view==2&&<View>
  <Text>
  no event on this day
  </Text>
  </View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerCalendar: {
    flex:1,
    backgroundColor:'#D49B35',
    marginTop:200,
  },
  calendar: {
    
    margin:0,
  },
});