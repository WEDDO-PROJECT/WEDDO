
import React, { useEffect, useRef, useState } from "react";

import { StyleSheet, TouchableOpacity, View,TextInput } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

import MapView, { Marker, Region ,LatLng, Point} from "react-native-maps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "../components/Themed";
import axios from "axios";

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import BasePath from "../constants/BasePath";
import StorageUtils from "../Utils/StorageUtils";
const  WeddingHalls = ({navigation}) => {
    const [myLocation, setLocation] = useState<LocationObject>();
    const [myRegion, setRegion] = useState<Region>(undefined);
    const [marker, setMarker] = React.useState<any>(undefined);
    const [name, setName] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("");
    const [markerSelected, setMarkerSelected] = React.useState<boolean>(false);
    const [markers, setMarkers] = React.useState<any>(undefined);
    const [weddingHalls, setweddingHalls] = React.useState<any>(undefined);
    const [weddingHall, setweddingHall] = React.useState<any>(undefined);


    const navigate = ()=> {
      
      StorageUtils.storeData('weddingHall',marker)
      navigation.navigate("WeddingHallDetails")
    }

   const  bs = React.createRef();
    
 const  fall = new Animated.Value(1);
    
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

   const renderInner = () => (
      <View style={styles.panel}>
        {marker && <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>{marker.name}</Text>
          <Text style={styles.panelSubtitle}>{marker.pack_price}</Text>
        </View>}
        
        <TouchableOpacity
          style={styles.panelButton}
          onPress={navigate}>
          <Text style={styles.panelButtonTitle}>View Details</Text>
        </TouchableOpacity>
      </View>
    );

    
 const renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
);
    

      useEffect(()=>{        
        axios
          .get(BasePath + "/api/sp/all")
          .then((response) => {
            console.log(response.data)
            let orders  =response.data
              orders = orders.filter((elem,i)=> elem.category == 'partyroom')
            console.log(orders)
            // setweddingHalls(response.data.result);
            console.log(response.data.result)
           // console.log(response.data)
    
            
            let markerss = [];
    
            orders.map((hall) => {
              const marker = {
                id: hall.id,
                latitude: Number(hall.latitude),
                longitude: Number(hall.longitude),
                name: hall.name,
                pack_price: hall.pack_price,
                category: hall.category,
                tel: hall.tel,
                email : hall.email,
                owner_name : hall.owner_name
              };
              markerss.push(marker);
            });
            setMarkers(markerss);
            console.log(markers)
          
          })
          .catch((error) => console.log(error));
        
         
        
      
        },[])

      const getAllXeddingHalls = async () => {
       
      };
    

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

      function markerClick(marker) {

       bs.current.snapTo(0)
       console.log(marker)
       setMarker(marker)

        // let khatwa = khatwas.find((element) => {
        //   return element.id === marker.key;
        // });
    
       
        // setKhatwa(khatwa);
        // setDetails(true);
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
          
     >

       { markers &&
              markers.map((marker) => (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.name}
                  description={marker.pack_price}
                  onPress={() => {
                    markerClick(marker);
                  }}
                ></Marker>
             )) }

      
        </MapView>
        <BottomSheet
        ref={bs}
        snapPoints={[392, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
        </View>
    )
}
export default WeddingHalls ;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    container1: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
    },
    panel: {
      backgroundColor: '#FFFFFF',
      paddingTop: 55,
      bottom:50,
      paddingBottom :1
      
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 25,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
    },
    panelButton: {
      padding: 13,
      borderRadius: 7,
      backgroundColor: '#d49b35',
      alignItems: 'center',
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
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