import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import DatePicker from "react-native-date-picker";
import InputField from "../components/input.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/button.js";
import Background from "../assets/Background.webp";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import StorageUtils from "../Utils/StorageUtils.js";
import { CurrentRenderContext } from "@react-navigation/native";

import BasePath from "../constants/BasePath";

const RegisterSP = ({ navigation }) => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [cin,setCin]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [tel,setTel]=useState("")
  const [category,setCategory]=useState("")
  const register=async()=>{
    
    const UserRegister ={
    owner_name : name,
    email : email,
    cin: cin,
    tel : tel,
    category : category,
    password : password,
    // confirmPassword
    }
    axios
    .post("http://192.168.11.80:3000/api/sp/Register",UserRegister)

    // .post(BasePath + "/api/sp/Register",UserRegister)

    .then((response)=>{
      //console.log(response.data.result[0])
      const userdata =response.data.result[0]
     StorageUtils.storeData('user',userdata)
       navigation.navigate("DrawerNavigator")
    })
    .catch((error)=>{
      console.log(error)
    })
    console.log(UserRegister)
  }
  const onChangeName =(text)=>{
    //console.log(text)
    setName(text)
  }
  const onChangeEmail = (text)=>{
   setEmail(text )
 // console.log(text)
  }
  const onChangeCin = (text)=>{
     setCin(text )
   // console.log(text)
    }
    
  const onChangeTel = (text)=>{
       setTel(text )
       // console.log(text)
        }
  const onChanePassword = (text)=>{
       setPassword(text )
          //console.log(text)
          }
  const onconfirmPassword = (text)=>{
        setConfirmPassword(text )
          //  console.log(text)
           }
  

  return (
    <ImageBackground
      style={{
        width: "100%",
        height: "100%",
      }}
      source={Background}
      resizeMode="cover"
      
    >
    
      <SafeAreaView
        style={{
          paddingHorizontal: 50,
          paddingHorizontal: 50,
          marginTop: 150,
        }}
      >  
      
        <View style={{ alignItems: "center" }}>
         
        </View>
        <Text
          style={{
            textAlign:"center",
            marginTop:5,
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 5,
          }}
        >
          Register
        </Text>
       
        
      
        <InputField
          label={"Full Name"}
          setValue={onChangeName}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={"Email "}
          setValue={onChangeEmail}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />
         <InputField
          label={"CIN"}
          setValue={onChangeCin}
          icon={
            <MaterialIcons
              name="badge"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />
        <View style={{marginBottom:15, marginTop:-20}}>
        <RNPickerSelect
                 
                 items={[
                     { label: "Beauty salons", value: "Hairdresser" },
                     { label: "Musical Band", value: "MusicalBand" },
                     { label: "Marriage hall", value: "partyroom" },
                     { label: "Photographer", value: "Photographer" },
                     
                 ]}
                 onValueChange={(e)=>setCategory(e)}
             />
        </View>
       
          <InputField
                label={"Phone Number"}
                setValue={onChangeTel}
                keyboardType="numeric"
                icon={
            <Ionicons
              name="call"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={"Password"}
          setValue={onChanePassword}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />
        <InputField
          label={"Confirm Password"}
          setValue={onconfirmPassword}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />
       
        

        <View>
           <CustomButton  label= {"Register"}  onPress={register} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

            }}
          >
            
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};  

export default RegisterSP;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});
  

