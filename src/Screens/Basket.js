import React,{ useEffect, useState} from 'react';
import { View, Text,TouchableOpacity, StyleSheet, ScrollView,Image } from 'react-native';
import BasePath from "../constants/BasePath";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function Basket(props){
    const [user,setUser]=useState('')
    const [list,setList]=useState([])
    useEffect(() => {
refresh()
        
    },[])
    const del=(elem)=>{
        var obj={
            user_id:elem.user_id,
            sp_id:elem.sp_id
        }
        axios.post(`${BasePath}/api/sp/request/delete`,obj)
        .then((res) =>{
            console.log(res.data);
            refresh()
        })

    }
    const refresh=()=>{
        AsyncStorage.getItem('weddingHall').then(
            res =>{
                console.log(JSON.parse(res))
                setUser(JSON.parse(res))
                var x= JSON.parse(res)
                axios.get(`${BasePath}/api/sp/request/all`)
                .then(res =>{
                    console.log(res.data)
                    setList( [ ...res.data ])
                })
            } 
            )
    }

    return (
      <ScrollView style={{backgroundColor: 'white'}}> 
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor:"white",marginTop:100}}>
            
            <TouchableOpacity onPress={refresh}>
                <Text>Refresh</Text>
            </TouchableOpacity>
            {list &&
                list.map((elem,i)=>(
                    <View key={i}
                        style={styles.card}
                    >
                        <Image  style={{width:150,height:150}} source={{uri:'http://i.imgur.com/XP2BE7q.jpg'}} /><Image/>
                        <Text style={styles.title}>{elem.owner_name}</Text>
                        <Text>{elem.email} </Text>
                      <Text>{elem.tel}</Text>
                      <Text style={{marginLeft:200}}>{elem.pack_price} DT</Text>
                      <TouchableOpacity style={{marginTop:-20}} onPress={()=>del(elem)}>
                          <Text>Delete </Text>
                      </TouchableOpacity>
                    </View>
                ))
            }
        </View>
      </ScrollView>   
    );
}

const styles= StyleSheet.create({
    card: {
    marginTop: 10,
    margin:20, 
    backgroundColor:'white',
    elevation:9,
    borderRadius:10,
    padding:10,
    width: 300,
    height: 250,
  },
  title: {
    fontSize:20,
    fontWeight:'500',
    color : '#D49B35',
    marginBottom:10,
    // paddingTop:130,
  },
})


// Basket;