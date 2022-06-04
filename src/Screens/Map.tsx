
import React, { useEffect, useRef, useState } from "react";

import { StyleSheet, TouchableOpacity, View,TextInput } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

import MapView, { Marker, Region ,LatLng, Point} from "react-native-maps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "../components/Themed";
import axios from "axios";

import BasePath from "../constants/BasePath";
const  MapContent = ({navigation}) => {
    const [myLocation, setLocation] = useState<LocationObject>();
    const [myRegion, setRegion] = useState<Region>(undefined);
    const [marker, setMarker] = React.useState<any>(undefined);
    const [name, setName] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("");
    const [markerSelected, setMarkerSelected] = React.useState<boolean>(false);

    
    
  const [errorMsg, setErrorMsg] = useState<string>("");
    const mapRef = useRef(null);
    const [departureEvent, setDepartureEvent] = React.useState<
     {
      coordinate: LatLng;
    }
  >();
  const  setPosition=(coordinate: LatLng)=>{
      console.log(coordinate)
      const marker = {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      };
      setMarker(marker)
      setMarkerSelected(true)
    }
    useEffect(() => {
        (async () => {
          let status= await Location.hasServicesEnabledAsync();
          // if (!status ) {
          //   setErrorMsg("Permission to access location was denied");
          //   return;
          // }
    
          let myLocation = await Location.getCurrentPositionAsync({});
          setLocation(myLocation);
          let region = {
            longitude: 10.1785077,//myLocation.coords.longitude,
            latitude:36.8868947, //myLocation.coords.latitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
          };
          setRegion(region);
        })();
      });

      const changeUserLocation = async () => {
        let previousLocation = myLocation;
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        if (
          location.coords.latitude !== myLocation.coords.latitude &&
          location.coords.longitude !== myLocation.coords.longitude
        ) {
          console.log("location changed");
          let region = {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
          };
    
          mapRef.current.animateToRegion(region);
        }
      };

      const editName = (text) => {
          setName(text)
      }
      const editPrice=(text)=>{
        setPrice(text)
      }
      function goBack() {
        console.log('bhvfjnfnvfvn')
        navigation.toggleDrawer();
      }
    
      const AddSalle =async()=>{
        const body ={
          name:name,
          price:price,
          latitude:marker.latitude,
          longitude:marker.longitude
        }
        axios 
        .post(BasePath + "/api/sp/addSalle",body)
        .then((response)=>{
          //console.log(response.data.result[0])
          const data =response.data.result[0]
          navigation.navigate("WeddingHallDetails",{weddinghalldata : data})
          console.log(data)
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    
    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={goBack} style={styles.roundButton}>
         
         <Ionicons
               name="menu-outline"
               size={30}
               color="#666"
               style={{ marginRight: 5 }}
             />
         </TouchableOpacity>
<MapView 
        onRegionChange={() => mapRef.current.forceUpdate()}
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={myRegion}
          onUserLocationChange={changeUserLocation}
          
          onPress={(e) => setPosition(e.nativeEvent.coordinate)}
     >

       { marker &&
                <Marker
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                ></Marker>
              }

      
        </MapView>
        {markerSelected && 
                <View style={styles.view}>
                <TextInput
                  style={styles.input}
                  placeholder={'Marriege Hall'}
                  value={name}
                  onChangeText={(text) => editName(text)}
                ></TextInput>
              <TextInput
                  style={styles.input}
                  placeholder={'price'}
                  value={price}
                  onChangeText={(text) => editPrice(text)}
                ></TextInput>
              <TouchableOpacity
                onPress={() => {
                  AddSalle();
                }}
                style={ styles.roundButtonActive }
              >
                <MaterialCommunityIcons
                  name= "play" 
                  color="#393834"
                  size={30}
                ></MaterialCommunityIcons>
                <Text
                  style={ styles.switchTextActive }
                > 
                Add 
                </Text>
              </TouchableOpacity>
            </View>
        }
        </View>
    )
}
export default MapContent ;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    roundButton: {
      height: 50,
      width:50,
      position:'absolute',
      top : 5,
      left:5
    },
    // backButtonView: { position: "absolute", top: "5%", left: "5%" },
    map: {
      position: "absolute",
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
    },
    input: {
      borderRadius: 10,
      width: "75%",
      borderColor:"#A9A9A9",
      borderWidth:1,
      backgroundColor: "#fff",
      fontSize: 20,
      height: 35,
      marginVertical: 7,
      alignItems: "center",
      color: "black",
      textAlign: "center",
    },
    view: { position: "absolute", bottom: 0, backgroundColor : '#ffffff' , width : '100%' , paddingBottom : 10,alignItems : 'center'},
    switchTextActive: {
      fontSize: 15,
      color: "#393834",
      marginLeft: 5,
    },
    switchTextInactive: {
      fontSize: 15,
      color: "#FFD804",
      marginLeft: 5,


    },
    roundButtonActive: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      padding: 10,
      borderRadius: 50,
      backgroundColor: "#FFD804",
      flexDirection: "row",
      paddingRight: 10,
    },
    roundButtonInactive: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      borderRadius: 50,
      padding: 10,
      backgroundColor: "#393834",
      flexDirection: "row",
      paddingRight: 10,
    },
  });