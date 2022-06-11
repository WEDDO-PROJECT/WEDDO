import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,Image, StyleSheet, ImageBackground,Alert, Modal, Pressable} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../input.js";
import golden from "../../assets/golden.webp";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageUtils from '../../Utils/StorageUtils.js';
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Cards(props) {
  const [minPrice,setMinPrice]=useState(null);
  const [maxPrice,setMaxPrice]=useState(null);
  const [data,setData]=useState([]);
  const [showAlert,SetshowAlert]=useState(false);
  useEffect(() => {
    var array=[]
    var arr=[]

    for (let i = 0 ; i < props.filtredData.length ; i ++){
      props.filtredData[i].status = Math.floor(Math.random() * 6) + 1
    }

    console.log(props.filtredData)


    if(minPrice&&maxPrice){
      array=props.filtredData.filter((elem,i)=> Number(elem.pack_price)>=minPrice)
      arr=array.filter((elem,i)=>Number(elem.pack_price)<=maxPrice)
      setData(arr)
    }else
    if (maxPrice&&!minPrice){
      array=props.filtredData.filter((elem,i)=> Number(elem.pack_price)<=maxPrice)
      setData(array)
    }else if(minPrice&&!maxPrice){
    array=props.filtredData.filter((elem,i)=> Number(elem.pack_price)>=minPrice)
      setData(array)
  }else{
    setData(props.filtredData)
  }
  console.log(data,'data');
    
  },[props.filtredData,minPrice,maxPrice])
    const goProfile=(sp)=>{
      console.log(props.start)
      if(props.start===""){
        console.log('sp')
        SetshowAlert(true)
      }
      else {
        StorageUtils.storeData('weddingHall',sp)
        if(sp.category=='Hairdresser'){
          props.navigation.navigate("Gallery")
        }else if(sp.category=='partyroom'){
          props.navigation.navigate("WeddingHallDetails")
        }else if(sp.category=='Photographer'){
          props.navigation.navigate("Gallery")
        } if(sp.category=='MusicalBand'){
          props.navigation.navigate("Gallery")
        }
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
            <View style={styles.input}>
            <InputField
          label={"Min Price"}
          setValue={setMinPrice}
        
          icon={
            <Ionicons
              name="cash-outline"
              size={20}
              color="#666"
              style={{ marginRight: 15, color:'#D49B35',marginTop: -5}}
            />
          }
        />
        </View>
            <View style={styles.input} >
            <InputField
          label={"Max Price"}
          setValue={setMaxPrice}
          icon={
            <Ionicons
              name="cash-outline"
              size={20}
              color="#666"
              style={{ marginRight: 15, color:'#D49B35',marginTop: -5}}
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
            
            <Image  style={{borderRadius:10,width:100,height:100,borderWidth:1,borderColor:'#D49B35',marginBottom:15}} source={{uri:'http://i.imgur.com/XP2BE7q.jpg'}} /><Image/>
            
           <Stars style={{paddingLeft:20}} 
                  default={elem.status}
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
                      <Text style={styles.title}>{elem.owner_name}</Text>
                      
                      <Text style={{
                        // marginHorizontal:'10',
                        // marginVertical:'10',
                      }}>{elem.category} </Text>
                      <Text>{elem.pack_title}</Text>
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
    fontSize:20,
    fontWeight:'500',
    color : '#D49B35',
    marginBottom:10,
    // paddingTop:130,
  },
  myStarStyle: {
    color: "#D49B35",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 30,
    // marginRight: 7,

    
  },
  myEmptyStarStyle: {
    color: "#D49B35",
  },
  input: {
    backgroundColor: 'white',
    // height: 40,
    margin: 10,
    borderWidth: 1,
    
    // padding: 10,
    alignItems: 'center',
    backgroundColor:'white',
    fontFamily: "sans-serif-thin",
    // fontWeight: "bold",
    textAlign:"center",
    alignItems:   'center',
    // fontColor:'#D49B35',
    left:-6,
    
    // borderColor: "#777",
    padding: 6,

    borderRadius: 6,
    height: 50,
    maxWidth: 340,
    width: 150,
    elevation: 12,
    alignSelf: "center",
    borderColor: "#D49B35",
    
  },
  btnOK:{
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  warningBtn:{
    backgroundColor:'#D49B35' ,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
  },
  card: {
    margin:20, 
    backgroundColor:'white',
    elevation:9,
    borderRadius:10,
    padding:10,
    width: 300,
    height: 250,
    borderColor: "#D49B35",
    borderWidth: 1,
  },
  cardText: {
    marginHorizontal:'10',
    marginVertical:'10',
  },
  price: {
    marginLeft:190,
    marginTop:-35,
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:80,
    borderRadius:11,
    backgroundColor: "#D49B35",
    textAlign: 'center',
    color: 'white',
    borderColor:'white',
    borderWidth: 1,
    elevation: 7,
  },
  alertText : {
    width:300,
    height: 300,
    backgroundColor: 'white',
    borderWidth:1,
    borderColor:'#D49B35',
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
    backgroundColor:'#D49B35' ,
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
  }
})
export default Cards;