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
import DatePicker from "react-native-date-picker";
import InputField from "../components/input.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/button.js";
import Background from "../assets/Background.webp";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
const RegisterSP = ({ navigation }) => {
  const [name,setName]=useState("aaaaa")
  const [email,setEmail]=useState("")
  const [cin,setCin]=useState("")
  const [password,setPassword]=useState("NNNNN")
  const [tel,setTel]=useState("")
  const [category,setCategory]=useState("")

  const register=()=>{
    console.log(password)

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
          justifyContent: "center",
          paddingHorizontal: 50,
          paddingHorizontal: 50,
          marginTop: 150,
        }}
      >
        <View style={{ alignItems: "center" }}>
         
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 21,
          }}
        >
          Register
        </Text>
       
        
      
        <InputField
          label={"Full Name"}
          setValue={setName}
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
          setValue={setEmail}
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
          onChangeText={(e)=>setCin(e)}
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
                 onValueChange={(value) => setCategory(value)}
                 items={[
                     { label: "Hairdresser", value: "Hairdresser" },
                     { label: "Musical Band", value: "MusicalBand" },
                     { label: "Party Room", value: "partyroom" },
                     { label: "Photographer", value: "Photographer" },
                     
                 ]}
                
             />
        </View>
       
              <InputField
          label={"Phone Number"}
          onChangeText={(e)=>{setTel(e)}}
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
          onChangeText={(e)=>{setPassword(e)}}
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
       
        

        <View
         
        >
          
          <CustomButton label={"Register"}  onPress={() => navigation.navigate("ProfileScreen1")}/>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

            }}
          >
            <Text> Already registered? </Text>
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
