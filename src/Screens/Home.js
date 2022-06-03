import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground , ScrollView, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Cards from '../components/homeComponents/Cards';
// import iP from '../constants/BasePath.js';

import Ionicons from "react-native-vector-icons/Ionicons";

import BasePath from "../constants/BasePath";
// import StorageUtils from '../Utils/StorageUtils';
const Home =({ navigation})=> {
  let imagePh = require('../assets/iconPhotogrape.png');
  let imageBand = require('../assets/band.png');
  let imageHS = require('../assets/hair.png');
  let imageHall = require('../assets/hall.png')
  let imagePack = require('../assets/package.png')

  const [person,setPerson]=useState(null)
  const [allData,setAllData]=useState([])
  const [filtredData,setFIltredData]=useState([])
  const [view,setView]=useState(null)
  const [start, setStart] = useState("");

  const array=[]
  useEffect(()=>{         // bring the url from the backend  
  setStart('')
    axios.get(BasePath + '/api/sp/all')
    .then(res=>{console.log(res.data)
      setAllData(res.data)})
    .catch(err=>console.log(err))
    setAllData(array);
    // AsyncStorage.getItem('user')
    // .then(res=>console.log(res))
  },[])
  const buttonFunction=(val)=>{
    var array=[]
if (val==1){
  array=allData.filter((elem,i)=> elem.category == 'photographer')
  setFIltredData(array)
  if(view===1)
  setView(null)
  else
  setView(1)
}
if (val===2){
  array=allData.filter((elem,i)=> elem.category == 'band')
  setFIltredData(array)
  if(view===2)
  setView(null)
  else
  setView(2)
}
if (val===3){
  array=allData.filter((elem,i)=> elem.category == 'hairSalon')
  setFIltredData(array)
  if(view===3)
  setView(null)
  else
  setView(3)
}
if (val===4){
  array=allData.filter((elem,i)=> elem.category == 'weddingHall')
  setFIltredData(array)
  if(view===4)
  setView(null)
  else
  setView(4)
}
// if (val===5){
//   array=allData.filter((elem,i)=> elem.category == 'Package')
//   setFIltredData(array)
//   if(view===5)
//   setView(null)
//   else
//   setView(5)
// }

  }
  let nav = () => {
    navigation.navigate({
      name: "Calendar",
      params: {
        setStart: setStart
      },
      merge: true,
    });
  }
    return (
  <ScrollView>
     <SafeAreaView>    
   
        <View style={styles.container}>  
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              // backgroundColor:"#AF9E9E",
              borderRadius: 10,
              // backgroundColor: '#D49B35',
              height: 60,
              bottom: 16,
              // right: 16,
              // left: 16,
            }}
          >
            <TouchableOpacity
              title="photographer"
              onPress={() => buttonFunction(1)}
              style={view==1&&styles.clicked}
              
            >
             <Image
                 style={styles.box}
                 source={imagePh}
             />
              <Text style={styles.text}>
                
                Photographer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="band"
              onPress={() => buttonFunction(2)}
              style={view==2&&styles.clicked}
            >
              <Image
                 style={styles.box}
                   source={imageBand}
             />
              <Text style={styles.text}>
                
                Band
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="hairSalon"
              onPress={() => buttonFunction(3)}
              style={view==3&&styles.clicked}
            >
              <Image
               style={styles.box}
               source={imageHS}
               />
              <Text style={styles.text}>
                
                Hair Salon
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                    title="weddingHall"
                    onPress={() => buttonFunction(4)}
                    style={view==4&&styles.clicked}
            >
                    <Image
                    style={styles.box}
                    source={imageHall}
                    />
                     <Text style={styles.text}>
                
                      Wedding Hall
                   </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                    title="weddingHall"
                    onPress={() => buttonFunction(5)}
                    style={view==5&&styles.clicked}
            >
                    <Image
                      style={styles.box}
                      source={imagePack}
                    />
                   <Text style={styles.text}>
                
                      Packages
                   </Text>
            </TouchableOpacity>             */}
         
          </View>
          <View>
          <View>
          <Text
                style={styles.inputFrom}
                onPress={() => {
                  nav();
                }}
              ><Ionicons name="calendar-outline" style ={{color:'#D49B35'}} size={26}></Ionicons>{"   "}{start === "" ? "Choose date" : start}
              </Text>
            </View>
              </View>
                  
          {view==null&&
             <Cards style={{
              // flexDirection: "row",
              // top: 30,
            }} filtredData={allData} setTView={setView} navigation={navigation}start={start}></Cards> 
          }
          {view&&
          <Cards style={{
            // flexDirection: "row",
            // top: 30,
          }} filtredData={filtredData} setTView={setView} navigation={navigation} start={start}></Cards> 
          }
          
    

  

  




            
              
             


            
        </View>
        </SafeAreaView>
  </ScrollView>
     );
}
const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems:   'center',
      justifyContent: 'center',
      backgroundColor:"white"
    
    },
    container2: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center"
    },
    image:{
     margin:5,
     width: 50,
     height: 50,
     borderRadius:30,
     borderWidth: 2,
     borderColor:'#D49B35',
    },
    text:{
     textAlign: 'center',
     color: "#D49B35",
     fontSize:10
    },
    
    clicked:{
      marginTop:10,
      // backgroundColor:'transparent',
      borderRadius:5
    },
    inputFrom:{
      backgroundColor:'white',
      fontFamily: "sans-serif-thin",
      // fontWeight: "bold",
      textAlign:"center",
      // fontColor:'#D49B35',
      left:-6,
      borderWidth: 0.5,
      borderColor: "#777",
      padding: 8,
      margin: 10,
      borderRadius: 6,
      height: 50,
      maxWidth: 340,
      width: 300,
      elevation: 12,
      alignSelf: "center",
      borderColor: "#D49B35"
    },
    leftFrom: {
      backgroundColor: "#D49B35",
      borderWidth: 0.5,
      borderColor: "#777",
      padding: 8,
      margin: 10,
      borderRadius: 6,
      height: 50,
      maxWidth: 340,
      width: 300,
      elevation: 12,
      alignSelf: "center",
    },
    box: {
      backgroundColor:'white',
      justifyContent: "center",
      alignSelf: "center",
      height: 55,
      width: 55,
      paddingVertical: 12,
      paddingHorizontal: 18,
      // marginVertical: 30,
      marginHorizontal: 11,
      borderRadius: 10,
      // elevation: 20,
      borderColor:'#D49B35',
      borderWidth: 1.5,
    },
})
export default Home;