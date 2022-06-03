import React,{ useEffect, useState} from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import BasePath from "../constants/BasePath";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function Basket(props){
    const [user,setUser]=useState('')
    const [list,setList]=useState([])
    useEffect(() => {
refresh()
        
    },[])

    const refresh=()=>{
        AsyncStorage.getItem('user').then(
            res =>{
                console.log(JSON.parse(res))
                setUser(JSON.parse(res))
                var x= JSON.parse(res)
                axios.get(`${BasePath}/api/request/getByIdUser/${x.id}`)
                .then(res =>{
                    console.log(res.data)
                    setList(res.data)
                })
            } 
            )
    }

    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Basket screen</Text>
            <TouchableOpacity onPress={refresh}>
                <Text>Refresh</Text>
            </TouchableOpacity>
            {
                list.map((elem,i)=>(
                    <View key={i}>
                        <Text style={{
                            // fontSize:20,
                            // fontWeight:'500',
                            // color : '#D49B35',
                            // marginHorizontal:'10'
                           }}>{elem.professional_name}</Text>
                        <Text>{elem.description} </Text>
                      <Text>{elem.pack_title}</Text>
                      <Text>{elem.pack_price} DT</Text>
                    </View>
                ))
            }
        </View>
    );
}

// Basket;