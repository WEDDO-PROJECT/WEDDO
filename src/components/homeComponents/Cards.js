import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,Image, StyleSheet, ImageBackground,Alert, Modal, Pressable} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../input.js";
import golden from "../../assets/golden.webp";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import BasePath from "../../constants/BasePath";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Cards(props) {
  const [minPrice,setMinPrice]=useState(null);
  const [maxPrice,setMaxPrice]=useState(null);
  const [data,setData]=useState([]);
  const [showAlert,SetshowAlert]=useState(false);
  useEffect(() => {
    var array=props.filtredData
    var arr=[]
    let obj={}
    if(minPrice&&maxPrice){
      array=array.filter((elem,i)=> Number(elem.pack_price)>=minPrice)
      arr=array.filter((elem,i)=>Number(elem.pack_price)<=maxPrice)
      setData(arr)
    }else
    if (maxPrice&&!minPrice){
      array=array.filter((elem,i)=> Number(elem.pack_price)<=maxPrice)
      setData(array)
    }else if(minPrice&&!maxPrice){
    array=array.filter((elem,i)=> Number(elem.pack_price)>=minPrice)
      setData(array)
  }else{
    setData(array)
  }
  },[props.filtredData,minPrice,maxPrice])
    const goProfile=(sp)=>{
      console.log(sp);
      if(props.start==''){
        console.log('sp')
        SetshowAlert(true)
      }
      else {
        console.log(sp);
        AsyncStorage.setItem('response',JSON.stringify(sp))
        props.navigation.navigate('Profile')
      }
    

    }
    
return (
  <View>
        <Modal
        visible={showAlert}
        transparent
        onRequestClose={() => SetshowAlert(false)}
        animationType='slide'
        >
          <View style={styles.centeredView}>
            <View style={styles.alertText}>
              <View style={styles.warning}>
                <Text>WARNING </Text>
              </View>
              <View style={styles.warningBody}>
                <Text style ={styles.warningText}>Please pick a date !</Text>
              </View> 
              <Pressable
              onPress={() =>SetshowAlert(false)}
              style={styles.warningBtn}
              android_ripple={{color:'#fff'}}
              >
                <Text style={styles.btnOK}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:"white"}}>
          
            <View>
            <View style={styles.minPr}>
            <InputField
          label={"Min Price"}
          setValue={setMinPrice}
        
          icon={
            <Ionicons
              name="cash-outline"
              size={20}
              color="#666"
              style={{ marginRight: 15, color:'#BF9B30',marginTop: -5}}
            />
          }
        />
        </View>
            <View style={styles.maxPr} >
            <InputField
          label={"Max Price"}
          setValue={setMaxPrice}
          icon={
            <Ionicons
              name="cash-outline"
              size={20}
              color="#666"
              style={{ marginRight: 15, color:'#BF9B30',marginTop: -5}}
            />
          }
        />
            
            </View>
                {data.map((elem,i)=>{
                  return(
                    <TouchableOpacity
                        key={i}
                        title="photographer"
                        onPress={()=>goProfile(elem)}>

            <View
            style={styles.card}
              >
                <View style={{display:'flex',flexDirection:'row',}}>
            
                      <Image  style={{borderRadius:10,width:100,height:100,borderWidth:1,borderColor:'#BF9B30',marginBottom:15}} source={{uri:elem.logo}} /><Image/>
                      
                     <Stars style={{paddingLeft:20}} 
              // half={true}
              default={elem.rating}
              disabled={true}
              spacing={4}
              count={5}
              fullStar={
                <Icon name={"star"} size={20} style={[styles.myStarStyle]} />
              } 
              emptyStar={
                <Icon
                  name={"star-outline"}
                  size={20}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
            />
            </View>
                      <Text style={styles.title}>{elem.professional_name}</Text>
                      
                      <Text style={{
                        color:'black',
                        fontSize: 20,
                      }}>{elem.description} </Text>
                      <Text style={{
                        color:'black',
                        // fontStyle: 'italic',
                        fontSize: 20,
                      }}>{elem.pack_title}</Text>
                      <TouchableOpacity 
                        key={i}
                        title="price"
                        onPress={()=>goProfile(elem)}>
                      <Text style={styles.price} >{elem.pack_price} DT</Text>
                      </TouchableOpacity>
                  </View>
                      
                      
                  
            </TouchableOpacity>


                  )
                })}
                

             </View>
            </View>
</View>
    );
}
const styles= StyleSheet.create({
  title: {
    fontSize:25,
    fontWeight:'500',
    color : '#BF9B30',
    marginBottom:110,
    marginTop:-115,
    marginLeft: 110,
  },

  minPr: {
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 1,
    // alignItems: 'center',
    backgroundColor:'white',
    // textAlign:"center",
    alignItems:   'center',
    left:-6,
    padding: 6,
    borderRadius: 6,
    height: 50,
    // maxWidth: 300,
    width: 120,
    elevation: 12,
    alignSelf: "center",
    borderColor: "#BF9B30",   
    marginRight: 150,
    marginBottom: -60

  },
  maxPr :{
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 1,
    // alignItems: 'center',
    backgroundColor:'white',
    // textAlign:"center",
    alignItems:   'center',
    left:-6,
    padding: 6,
    borderRadius: 6,
    height: 50,
    // maxWidth: 340,
    width: 120,
    elevation: 12,
    alignSelf: "center",
    borderColor: "#BF9B30", 
    marginLeft: 160,
    // marginBottom:50
  },

  card: {
    margin:20, 
    backgroundColor:'white',
    elevation:9,
    borderRadius:10,
    padding:10,
    width: 300,
    minHeight: 250,
    borderColor: "#BF9B30",
    borderWidth: 1,
  },

  cardText: {
    marginHorizontal:'10',
    marginVertical:'10',
  },

  price: {
    marginLeft:190,
    marginTop:3,
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:80,
    borderRadius:11,
    backgroundColor: "#BF9B30",
    textAlign: 'center',
    color: 'white',
    borderColor:'white',
    borderWidth: 1,
    elevation: 7,
    paddingTop: 5,
  },

  alertText : {
    width:300,
    height: 300,
    backgroundColor: 'white',
    borderWidth:1,
    borderColor:'#BF9B30',
    borderWidth: 1,
    borderRadius:20,

  },

  centeredView: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#00000099',
   },

  warning: {
    height:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#BF9B30' ,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },

  warningBody: {
    height:200,
    justifyContent:'center',
    alignItems:'center',
  },

  warningText: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  btnOK:{
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  warningBtn:{
    backgroundColor:'#BF9B30' ,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },

  myStarStyle: {
    color: "#BF9B30",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 30,  
  },

  myEmptyStarStyle: {
    color: "#BF9B30",
  },
  

})
  export default Cards;