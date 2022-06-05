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

  
  let charactersRegex = /^[a-zA-z]+$/;
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const [data, setData] = React.useState({
                                tel: "",
                                password: "",
                                owner_name: "",
                                email:"",
                                category:"",
                                cin:"",
                                owner_nameChange: false,
                                passwordChange: false,
                                emailChange:false,
                                categoryChange:false,
                                cinChange:false,
                                telChange: false,
                              });
  const register=async()=>{
    
    const UserRegister ={
    owner_name :data.owner_name,
    email : data.email,
    cin: data.cin,
    tel :data.tel,
    category : data.category,
    password : data.password,
    // confirmPassword
    }
    axios

    .post(BasePath + "/api/sp/Register",UserRegister)

    .then((response)=>{
      console.log("response.data.result[0]")
      console.log(response.data)
      const userdata =response.data.result[0]
     StorageUtils.storeData('user',userdata)
        if(userdata.category=='Hairdresser'){
          navigation.navigate("DrawerNavigatorHairdresser")
        }else if(userdata.category=='partyroom'){
          navigation.navigate("DrawerNavigatorSP")
        }else if(userdata.category=='Photographer'){
          navigation.navigate("DrawerNavigatorPhotographer")
        } if(userdata.category=='MusicalBand'){
          navigation.navigate("DrawerNavigatorMusicalBand")
        }
    })
    
    .catch((error)=>{
      console.log(error)
    })
    console.log(UserRegister)
  }

  const telChange = (val) => {
    if (val.length === 8) {
      setData({
        ...data,
        tel: val,
        telChange: true,
      });
    } else {
      setData({
        ...data,
        tel: val,
        telChange: false,
      });
    }
  };
  const owner_nameChange = (val) => {
    if (val.length > 3 && charactersRegex.test(val)) {
      setData({
        ...data,
        owner_name: val,
        owner_nameChange: true,
      });
    } else {
      setData({
        ...data,
        owner_name: val,
        owner_nameChange: false,
      });
    }
  };
  const emailChange = (val) => {
    if (val.length > 3 && emailRegex.test(val)) {
      setData({
        ...data,
        email: val,
        emailChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        emailChange: false,
      });
    }
  };
  const categoryChange = (val) => {
   
      setData({
        ...data,
        category: val,
        categoryChange: true,
      });
    
  };
  const cinChange = (val) => {
    if (val.length === 8) {
      setData({
        ...data,
        cin: val,
        cinChange: true,
      });
    } else {
      setData({
        ...data,
        cin: val,
        cinChange: false,
      });
    }
  };
  const passwordChange = (val) => {
    if (val.length > 3 && passwordRegex.test(val)) {
      setData({
        ...data,
        password: val,
        passwordChange: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        passwordChange: false,
      });
    }
  };




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
       
        
        <View>
        <InputField
          label={"Name"}
          setValue={owner_nameChange}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        {!data.owner_nameChange && data.owner_name!=="" ? (
          <Text style={{color: 'red' , marginTop : -18}}>Name must only contains Characters </Text>
        ) : null} 
        </View>
        <View>
        <InputField
          label={"Email "}
          setValue={emailChange}
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
        {!data.emailChange && data.email!==""  ? (
          <Text style={{color: 'red' , marginTop : -18}}>email must be correct</Text>
        ) : null}</View>
        <View>
         <InputField
          label={"CIN"}
          setValue={cinChange}
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
         {!data.cinChange && data.cin!=="" ? (
          <Text style={{color: 'red' , marginTop : -18}}>cin has 8 numbers </Text>
        ) : null}</View>
        <View style={{marginBottom:15, marginTop:20}}>
        <RNPickerSelect
                 
                 items={[
                     { label: "Beauty salons", value: "Hairdresser" },
                     { label: "Musical Band", value: "MusicalBand" },
                     { label: "Wedding hall", value: "partyroom" },
                     { label: "Photographer", value: "Photographer" },
                     
                 ]}
                 onValueChange={(e)=>categoryChange(e)}
             />
        </View>
        <View>
          <InputField
                label={"Phone Number"}
                setValue={telChange}
                keyboardType="numeric"
                icon={
            <Ionicons
              name="call"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />{!data.telChange && data.tel!==""  ? (
          <Text style={{color: 'red' , marginTop : -18}}>phone must have 8 numbers </Text>
        ) : null}</View>
        <View>
        <InputField
          label={"Password"}
          setValue={passwordChange}
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
        {!data.passwordChange && data.password!=="" ? (
          <Text style={{color: 'red' , marginTop : -18}}> password not strong enough </Text>
        ) : null}</View>
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

        <TouchableOpacity
              disabled={
                !data.categoryChange &&
                !data.cinChange &&
                !data.telChange &&
                !data.owner_nameChange &&
                !data.passwordChange &&
                !data.emailChange 

                }  onPress={register} 
                  style={{
                    backgroundColor: "#EBBAD2",
                    padding: 5,
                    borderRadius: 10,
                    marginBottom: 30,
                    borderColor: "#ddd",
                    borderWidth: 2,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                  }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#fff",
        }}
      >
        Register
      </Text>
    </TouchableOpacity>




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
