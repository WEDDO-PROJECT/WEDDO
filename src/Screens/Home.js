import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,ImageBackground , ScrollView} from 'react-native';

import {Avatar,Title,Caption,TouchableRipple} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Cards from '../components/homeComponents/Cards';
import weddinghall from "../assets/weddinghall.jpg";
import photographer from "../assets/photographer.jpg";
import hairdresser from "../assets/hairdresser.webp";
import music from "../assets/music.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
const COLORS = {
  white: '#FFF',
  dark: '#000',
  primary: '#F9813A',
  secondary: '#fedac5',
  light: '#E5E5E5',
  grey: '#908e8c',
};
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
  const [from, setFrom] = useState("");
  const [end, setEnd] = useState("");
  const array=[]
  useEffect(()=>{         // bring the url from the backend  
  // useEffect(()=>{         // bring the url from the backend 
     
  //     StorageUtils.retrieveData('user').then((value) =>
  //    //setUser(JSON.parse(value))
  //    console.log(value)
  //  );
    axios.get(BasePath + '/api/sp/all')
    .then(res=>{console.log(res.data)
      setAllData(res.data)})
    .catch(err=>console.log(err))
    
    setAllData(array);
    AsyncStorage.getItem('user')
   .then(res=>console.log(res))
   
  

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
  const WeddingHalls = ()=>{
    navigation.navigate("WeddingHalls")
  }
  let nav = () => {
    navigation.navigate({
      name: "Calendar",
      params: {
        start: setFrom,
        end: setEnd,
      },
      merge: true,
    });
  }
    return ( 
   <ScrollView style={{top:20 ,marginBottom :20}}>
        <View style={{flexDirection :'row' , marginTop : 0}}>
        
        <Title style={{marginLeft : '12%' ,fontSize:23, marginBottom:15,marginTop:15,color:'#D49B35'}}> Choose the service you want</Title>
         
        </View>
        <View style={styles.cartCard }>
              <ImageBackground
                  style={{
                    width: "100%",
                    height: '100%',
                  }}
                  source={photographer}
                  resizeMode="cover"
            >
                <Title style={{marginLeft : '5%' ,fontSize:34, marginTop:45,color:'#FFFFFF'}}> Photographers</Title>
                <TouchableOpacity style={styles.panelButton} >
                        <Text style={styles.panelButtonTitle}>View here</Text>
                </TouchableOpacity>
          </ImageBackground>
       
        </View>
        <View style={styles.cartCard }>
            <ImageBackground
                style={{
                  width: "100%",
                  height: '100%',
                }}
                source={hairdresser}
                resizeMode="cover"
            >

            <Title style={{marginLeft : '5%' ,fontSize:34, marginTop:45,color:'#FFFFFF'}}> Hair Salons</Title>
            <TouchableOpacity style={styles.panelButton} >
                    <Text style={styles.panelButtonTitle}>View here</Text>
            </TouchableOpacity>
        </ImageBackground>
       
        </View>
        <View style={styles.cartCard }>
        
              <ImageBackground
                  style={{
                    width: "100%",
                    height: '100%',
                  }}
                  source={weddinghall}
                  resizeMode="cover"
            >
              <Title style={{marginLeft : '5%' ,fontSize:34, marginTop:45,color:'#FFFFFF'}}>Wedding Halls </Title>
          <TouchableOpacity style={styles.panelButton} onPress={WeddingHalls} >
                  <Text style={styles.panelButtonTitle}>View here</Text>
                </TouchableOpacity>
    </ImageBackground>
        </View>
        <View style={styles.cartCard }>
        <ImageBackground
            style={{
              width: "100%",
              height: '100%',
              borderRadius:7
            }}
            source={music}
            resizeMode="cover"
      >
        <Title style={{marginLeft : '5%' ,fontSize:34, marginTop:45,color:'#FFFFFF'}}>Musical Bands</Title>
    <TouchableOpacity style={styles.panelButton} >
            <Text style={styles.panelButtonTitle}>View here</Text>
          </TouchableOpacity>
    </ImageBackground>
       
        </View>



   </ScrollView>
        
     );
}
const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"white"
    
    },
    image:{
     margin:5, width: 50, height: 50, borderRadius:30,
    },
    text:{
     textAlign: 'center', color: "#AD40AF",fontSize:8
    },
    cartCard: {
      height: 200,
      elevation: 15,
      borderRadius: 10,
      backgroundColor: COLORS.white,
      marginVertical: 6,
      marginHorizontal: 6,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
    },
    panelButton: {
      padding: 13,
      borderRadius: 20,
      width :180,
      backgroundColor: 'transparent',
      alignItems: 'center',
      left : '57%',
      top : '34%'
    },
    panelButtonTitle: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: "bold",
    },
    clicked:{
      marginTop:10,
      backgroundColor:'transparent',
      borderRadius:5
    },
    inputFrom:{
      fontFamily: "sans-serif-thin",
      fontWeight: "bold",
      textAlign:"center",
      left:-6,
    },
    leftFrom: {
      backgroundColor: "white",
      borderWidth: 0.5,
      borderColor: "#777",
      padding: 8,
      margin: 10,
      borderRadius: 6,
      height: 50,
      maxWidth: 340,
      width: 300,
      alignSelf: "center",
    },
    box: {
      backgroundColor:'#f0c5da',
      justifyContent: "center",
      alignSelf: "center",
      height: 55,
      width: 55,
      paddingVertical: 12,
      paddingHorizontal: 18,
      // marginVertical: 30,
      marginHorizontal: 11,
      borderRadius: 10,
    },
})
export default Home;

















// <View style={styles.container}>  
//           <View
//             style={{
//               flexDirection: "row",
//               marginTop: 40,
//               // backgroundColor:"#AF9E9E",
//               borderRadius: 10,
//               // backgroundColor: '#f0c5da',
//               height: 60,
//               bottom: 16,
//               // right: 16,
//               // left: 16,
//             }}
//           >
//             <TouchableOpacity
//               title="photographer"
//               onPress={() => buttonFunction(1)}
//               style={view==1&&styles.clicked}
              
//             >
//              <Image
//                  style={styles.box}
//                  source={imagePh}
//              />
//               <Text style={styles.text}>
                
//                 Photographer
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               title="band"
//               onPress={() => buttonFunction(2)}
//               style={view==2&&styles.clicked}
//             >
//               <Image
//                  style={styles.box}
//                    source={imageBand}
//              />
//               <Text style={styles.text}>
                
//                 Band
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               title="hairSalon"
//               onPress={() => buttonFunction(3)}
//               style={view==3&&styles.clicked}
//             >
//               <Image
//                style={styles.box}
//                source={imageHS}
//                />
//               <Text style={styles.text}>
                
//                 Hair Salon
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                     title="weddingHall"
//                     onPress={() => buttonFunction(4)}
//                     style={view==4&&styles.clicked}
//             >
//                     <Image
//                     style={styles.box}
//                     source={imageHall}
//                     />
//                      <Text style={styles.text}>
                
//                       Wedding Hall
//                    </Text>
//             </TouchableOpacity>
//             {/* <TouchableOpacity
//                     title="weddingHall"
//                     onPress={() => buttonFunction(5)}
//                     style={view==5&&styles.clicked}
//             >
//                     <Image
//                       style={styles.box}
//                       source={imagePack}
//                     />
//                    <Text style={styles.text}>
                
//                       Packages
//                    </Text>
//             </TouchableOpacity>             */}
         
//           </View>
//           <View>
//           <View style={styles.leftFrom}>
//           <Text
//                 style={styles.inputFrom}
//                 onPress={() => {
//                   nav();
//                 }}
//               >{from === "" ? "From" : from}{"   "}<Ionicons name="calendar-outline" size={26}></Ionicons>{"   "}{end === "" ? "To" : end}
//               </Text>
//             </View>
//               </View>
                  
//           {view==null&&
//              <Cards style={{
//               // flexDirection: "row",
//               // top: 30,
//             }} filtredData={allData} setTView={setView}></Cards> 
//           }
//           {view&&
//           <Cards style={{
//             // flexDirection: "row",
//             // top: 30,
//           }} filtredData={filtredData} setTView={setView}></Cards> 
//           }
            
              
             


            
//         </View>