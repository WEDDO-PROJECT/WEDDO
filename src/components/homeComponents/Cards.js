import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,Image, StyleSheet, ImageBackground} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import InputField from "../input.js";
import golden from "../../assets/golden.webp";

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
    const goProfile=()=>{

    // to profile 

    }
    
return (
        
        <View>
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
              // style={{ marginRight: 5, color:'#D49B35' }}
            />
          }
        />
        </View>
            <View style={styles.input}>
            <InputField
          label={"Max Price"}
          setValue={setMaxPrice}
          icon={
            <Ionicons
              name="cash-outline"
              size={20}
              color="#666"
              // style={{ marginRight: 5, color:'#D49B35' }}
            />
          }
        />
            
            </View>
                {data.map((elem,i)=>{
                  return(
                    <TouchableOpacity
                        key={i}
                        title="photographer"
                        onPress={goProfile}>

            <View
            style={{
              // margin:15, 
              // // backgroundColor:'white',
              // height: 120,
              // shadowColor: '#000',
              // shadowOffset: {
              //   width:1,
              //   height: 1,
              // },
              // shadowOpacity:0.75,
              // elevation:9,
              // borderRadius:10
              }}
              >
               <ImageBackground
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
                > 
                      <Text style={{
                            // fontSize:20,
                            // fontWeight:'500',
                            // color : '#D49B35',
                            // marginHorizontal:'10'
                           }}>{elem.professional_name}</Text>
                      
                      {/* <Image  style={{width:"50",height:"50"}} source={{uri:elem.logo}} /><Image/> */}
                      <Text>{elem.description} </Text>
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
                    </ImageBackground>   
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
    // fontSize:20,
    // fontWeight:'800',
    // marginHorizontal:'10'
  },
  input: {
    // backgroundColor: 'white',
    // borderColor:'#D49B35',
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
  },
})
  export default Cards;