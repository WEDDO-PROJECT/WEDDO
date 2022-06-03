import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,Image, StyleSheet, ImageBackground,Alert} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../input.js";
import golden from "../../assets/golden.webp";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Cards(props) {
  const [minPrice,setMinPrice]=useState(null)
  const [maxPrice,setMaxPrice]=useState(null)
  const [data,setData]=useState([])
  useEffect(() => {
    var array=[]
    var arr=[]
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
      console.log(sp);
      if(props.start==''){
console.log('sp')
        Alert.alert(
          "Alert Title",
          "My Alert Msg",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
      else {
        console.log('sp');
        AsyncStorage.setItem('response',JSON.stringify(sp))
        props.navigation.navigate('Profile')
      }
    

    }
    
return (
        
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor:"white"}}>
          {/* <TouchableOpacity onPress={()=>props.setTView(null)}>
          
          <Image
               source={{
               uri:
              'https://img.icons8.com/ios/500/back--v1.png',
              }}
               style={{width: 50, height: 20,marginLeft:-80}}
   
          />
           <Text style= {{marginLeft:-75}}>
              Back 
           </Text>
           </TouchableOpacity> */}
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
               {/* <ImageBackground
                  style={{
                    // marginTop:10,
                    // width: "100%",
                    // height: "100%",
                    // borderRadius:10,
                    // borderColor: "#D49B35",
                    // borderWidth: 1.5,
                  
                  }}
                  source={golden}
                  resizeMode="cover"
                >  */}
                      <Text style={styles.title}>{elem.professional_name}</Text>
                      
                      {/* <Image  style={{width:"50",height:"50"}} source={{uri:elem.logo}} /><Image/> */}
                      <Text style={{
                        // marginHorizontal:'10',
                        // marginVertical:'10',
                      }}>{elem.description} </Text>
                      <Text>{elem.pack_title}</Text>
                      <Text>{elem.pack_price} DT</Text>
                      {/* <TouchableOpacity
                        title="AddToBasket"
                        onPress={() => navigation.navigate("Basket")}
                      > 
                        <Text style={{ color: "#AD40AF", fontWeight: "700",marginLeft: 200, }}>
                          {" "}
                          add
                        </Text>
                      </TouchableOpacity> */}
                    {/* </ImageBackground>    */}
                  
                  </View>
            </TouchableOpacity>


                  )
                })}
                

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
    paddingTop:130,
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
    borderWidth: 0.5,
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
  card: {
    margin:20, 
    backgroundColor:'white',
    elevation:9,
    borderRadius:10,
    padding:10,
    width: 300,
    height: 250,
  },
  cardText: {
    marginHorizontal:'10',
    marginVertical:'10',
  }
})
  export default Cards;