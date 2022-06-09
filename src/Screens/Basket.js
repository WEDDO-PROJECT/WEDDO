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
            sp_id:elem.sp_id,
            date:elem.date
        }
        axios.post(`${BasePath}/api/request/delete`,obj)
        .then((res) =>{
            console.log(res.data);
            refresh()
        })

    }
    const refresh=()=>{
        AsyncStorage.getItem('user').then(
            res =>{
                console.log(JSON.parse(res))
                setUser(JSON.parse(res))
                var x= JSON.parse(res)
                axios.get(`${BasePath}/api/request/getByIdUser/${x.id}`)
                .then(result =>{
                    console.log('requests',result.data)
                    setList(result.data)
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
            {
                list.map((elem,i)=>(
                    <View key={i}
                        style={styles.card}
                    >
                        <Image  style={{borderRadius:10,width:100,height:100,borderWidth:1,borderColor:'#D49B35',marginBottom:15}} source={{uri:elem.logo}} /><Image/>
                        <Text style={styles.title}>{elem.professional_name}</Text>
                        <Text style={{
                        color:'black',
                        fontSize: 20,
                      }}>{elem.description} </Text>
                      <Text style={{
                        color:'black',
                        fontSize: 20,
                      }}>{elem.pack_title}</Text>
                      <Text style={styles.price}>{elem.pack_price} DT</Text>
                      <TouchableOpacity onPress={()=>del(elem)}>
                          <Text style={styles.delete}>Delete</Text>
                      </TouchableOpacity>
                      {!elem.confirme&&<View style={{backgroundColor:'yellow',height:20}}><Text>Waiting</Text></View>}
                      {elem.confirme==1&&<View style={{backgroundColor:'green'}}><Text>confirmed</Text></View>}
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
    borderWidth:1,
    borderColor: '#D49B35',
    padding:10,
    width: 300,
    minHeight: 250,
  },
  title: {
    fontSize:25,
    fontWeight:'500',
    color : '#D49B35',
    marginBottom:80,
    marginTop:-115,
    marginLeft: 110,
    // paddingTop:130,
  },
  price: {
    marginLeft:190,
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:80,
    borderRadius:11,
    backgroundColor: "#D49B35",
    textAlign: 'center',
    color: 'white',
    borderColor:'white',
    borderWidth: 1,
    elevation: 7,
    paddingTop: 5,
    marginBottom:20
  },
  delete : {
    marginLeft:190,
    marginTop:-18,
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:80,
    borderRadius:11,
    backgroundColor: "white",
    textAlign: 'center',
    color: '#D49B35',
    borderColor:'#D49B35',
    borderWidth: 1,
    elevation: 7,
    paddingTop: 5,
  },
})


// Basket;