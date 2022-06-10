import { StyleSheet, View ,Text, ScrollView,TouchableOpacity} from "react-native";
import React,{useEffect,useState} from "react";
// import Calendar from "react-native-calendar-range-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import BasePath from '../../constants/BasePath'

import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

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
  AsyncStorage.getItem('user')
  .then(res=>{
    console.log(res);
    var x=JSON.parse(res);
    axios.post(`${BasePath}/api/request/send`,{id:x.id})
    .then(res=>{
      console.log(res.data);
      var array=res.data
      setRequests(res.data)
      
      var obj={}
      for (var i=0;i<array.length;i++){
        if(array[i].confirme){
          var y=array[i].date
          console.log(y);
          obj[`${y}`]={selected: true, selectedColor: 'green'}
        }else{
          var y=array[i].date
          console.log(y);
          obj[`${y}`]={selected: true, selectedColor: 'red'}
        }
      }
      console.log(obj);
      setMarker(obj)
    })
  }

  )
},[request])
const confirm=()=>{
  console.log(1);
  axios.post(BasePath+'/api/request/update',request)
  .then(res=>{
    console.log(res.data)
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
    axios.post(`${BasePath}/api/request/delete`,obj)
    .then((res) =>{
        console.log(res.data);
        setRequest(null)
        setLook(0)
        setUser({})
    })

}

  return (
    <ScrollView style={styles.containerCalendar}>
      <Calendar
  // Collection of dates that have to be marked. Default = {}
  markedDates={marker}
  onDayPress={day => {
      setView(2)
      let y=0
      for (var i=0;i<requests.length;i++) {
        
        if(requests[i].date==day.dateString){
          console.log(requests[i]);
          if(requests[i].confirme==null){
            y=1
            setRequest(requests[i])
          }
          axios.post(BasePath+'/api/user/oneUser',{id:requests[i].user_id})
          .then(res=>{
            
            setLook(y)
            setUser(res.data[0])
            setView(1)
            
          })
        }
        
      }
      
  }}
/>
{view==1&&<View style={styles.text}>
  <Text>
   Username : {user.name}
  </Text>
  <Text>
   Tel : {user.tel_number}
  </Text>
  <Text>
   Email: {user.email}
  </Text>
  
  {look==1&&view==1&&<View>
  <TouchableOpacity style={styles.confirm} onPress={()=>confirm()} >
  <Text style={{color:'white'}}>
  Confirm
  </Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.cancel} onPress={()=>del(request)} >
  <Text style={{color:'white'}}>
  Cancel
  </Text>
  </TouchableOpacity>
  </View>}
{view==2&&<View>
  <Text>
  no event on this day
  </Text>
  </View>}
  </View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerCalendar: {
    flex:1,
    backgroundColor:'#BF9B30',
    marginTop:50,
    flexDirection: "column",
  },
  text:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
    backgroundColor:'white',
    borderRadius:5,
    margin:50,
    minHeight:150,
    elevation:12
  },
  confirm:{
    marginTop:50,
    marginBottom:-19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:80,
    borderRadius:11,
    backgroundColor: "green",
    textAlign: 'center',
    color: 'white',
    borderColor:'white',
    borderWidth: 1,
    elevation: 7,
    
  },
  cancel:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:80,
    borderRadius:11,
    backgroundColor: "red",
    textAlign: 'center',
    color: 'green',
    borderColor:'white',
    borderWidth: 1,
    elevation: 7,
    marginLeft:170,
  }
});