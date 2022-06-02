import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import CardExemple from '../components/Card.js'; 

import BasePath from "../constants/BasePath";

const Rooms =({navigation})=>{
    
    const   to="aefgrz"
    const  [rooms,setRooms]=useState([])

    useEffect(() => {
         axios
         .get(BasePath + '/api/sp/SelectSalle')
         .then((response)=>{
             console.log(response.data.result)
             setRooms(response.data.result)
         
         })
        
      }, []);
    return(
        <ScrollView style={{marginTop:65 }}>
            <View style={{alignItems:'center'}}>
          { rooms.map((room)=>(
              <View style={{marginBottom : 4}}>
                {/* <CardExemple  name = {room.name} from = {room.price} to={to} /> */}
                </View>
          )) }
          </View>
        
        </ScrollView>
    )
}
export default Rooms;