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
// import InputField from "../components/input.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/button.js";
import Background from "../assets/Background.webp";
import axios from 'axios'
import StorageUtils from "../Utils/StorageUtils.js";

import BasePath from "../constants/BasePath";
const RegisterScreen = ({ navigation }) => {
const [name,setName]=useState(null)
const [password,setPassword]=useState(null)
const [email,setEmail]=useState(null)
const [confirme_Password,setConfirme_Password]=useState(null)
const [tel_number,setTel_number]=useState(null)

const send=()=>{
  let person={email,name,password,tel_number}

  axios.post(BasePath + '/api/user/signup',person)

  .then(res=>{
    console.log(res.data);
    const userdata =response.data.result[0]
     StorageUtils.storeData('user',userdata)
    navigation.navigate("Home")
  })
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
          {/* <RegistrationSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          /> */}
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
          label={"Password"}
          setValue={setPassword}
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
          setValue={setConfirme_Password}
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
          label={"Phone Number"}
          setValue={setTel_number}
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

        <View
          style={
            {
              // flexDirection: "row",
              // borderBottomColor: "#ccc",
              // borderBottomWidth: 1,
              // paddingBottom: ,
              // marginBottom: 30,
            }
          }
        >
          {/* <Ionicons
            name="picture"
            size={20}
            color="#666"
            style={{ marginRight:  }}
          /> */}
          <CustomButton label={"Register"} onPress={ send } />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              // marginTop: 150,
            }}
          >
           
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;
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
