import React, { useState } from "react";

import {
  ImageBackground,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  navigation,
  useWindowDimensions,
  StyleSheet,
} from "react-native";



// import iP from '../constants/BasePath.js';
import Ionicons from "react-native-vector-icons/Ionicons";
import StorageUtils from "../Utils/StorageUtils"
import CustomButton from "../components/button.js";
import Logo from "../components/Logo.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InputField from "../components/input.js";
import Background from "../assets/Background.webp";

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";
import Profile from "../components/profile.js";



import BasePath from "../constants/BasePath";

import { NativeModules } from 'react-native';

// const { scriptURL } = NativeModules.SourceCode;
// const scriptHostname = scriptURL.split('://')[1].split(':')[0];
// console.log(scriptHostname)
// import { useNavigation } from "@react-navigation/native";
// import GoogleSVG from "../assets/google.svg";
// import FacebookSVG from "../assets/facebook.svg";
// import TwitterSVG from "../assets/twitter.svg";
// import Google from "./google.js"
// import Roboto-Medium from '../assets/font/Roboto-Medium.ttf'
// import { TextInput } from "react-native-web";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "react-native-google-signin";
// const navigation = useNavigation();



// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";
// import StorageUtils from "../Utils/StorageUtils.js";
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    
  const [errorMsg, setErrorMsg] = useState(null);
    // const navigation = useNavigation();
  //   const onLoginPressed =()=>{
  //     obj={
  //       password:password,
  //       email:email
  //     }
  //     axios
  //     .post(BasePath+"/api/sp/login", {
  //       password,
  //       email
  //     })
  //     .then((res)=>{
  //       if(res.data[0] ==="Email or password is incorrect!"){
  //         // console.log(data)
  //         // console.log(res.result)
  //         console.warn("wrong password or email")
  //       }
  // console.log(res.data)

  // // await AsyncStorage.setItem("response",JSON.stringify(res.data))

  // // navigation.navigate("Profile")
  // //       }
  //     })
  // // .catch((err)=>console.log(err))


  // };


const send=()=>{
  let person={email:email, password:password}
  console.log(person);
  axios.post(BasePath + '/api/user/login',person)
  .then(res=>{console.log(res.data)

    //  if(res.data[0]==='success'){
    //    AsyncStorage.setItem('user',JSON.stringify(res.data[1]))
    //    navigation.navigate("drawer")
    //  }


    
  if(res.data[0]==="Please fill all the fields" || res.data[0]==="email not found" || res.data[0]==="login failed" ){
    setErrorMsg(res.data)
  }
  if(res.data[0]==='success'){
    var userdata =res.data[1]
    console.log(userdata);
    AsyncStorage.setItem('user',JSON.stringify(userdata))
    navigation.navigate("drawer");
  }


  }).catch(err=>{console.log('error', err.message)})
  
}
  const { height } = useWindowDimensions();
  // const navigation = useNavigation();
  //   const myIcon = <Icon name="bird" size={30} color="#900" />;
  return (
  
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <Logo
              height={300}
              width={300}
              style={{ transform: [{ rotate: "-5deg" }] }}
            />
          </View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
          >
            Login
          </Text>
          <InputField
            value={email}
            setValue={setEmail}
            label={"Write Your Email ...  "}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="password"
          />
          <InputField
            value={password}
            setValue={setPassword}
            label={"Password"}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="password"
            inputType="password"
          />
          {errorMsg && 
          <Text style={{color: 'red' , marginTop:-20}}>{errorMsg} </Text>}
          
          
        <TouchableOpacity
                disabled={email==="" ||password ===""}  
                onPress={send} 
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
                Login
              </Text>
            </TouchableOpacity>
          <Text
            style={{ textAlign: "center", color: "#EBBAD2", marginBottom: 20 }}
          >
           
          </Text>
          {/* <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            style={{
              borderColor: "#ffff",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            Login with Facebook
          </Icon.Button> */}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <GoogleSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <FacebookSVG height={24} width={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                borderColor: "#ddd",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <TwitterSVG height={24} width={24} />
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            {/* /<Text>New to the app?</Text> */}

             <TouchableOpacity
              title="Register"

              onPress={() => navigation.navigate("RegisterScreen")}
            > 
              {/* <Text style={{ color: "#AD40AF", fontWeight: "700" }}>

              onPress={() =>navigation.navigate("RegisterScreen")}
            >  */}
              <Text style={{ color: "#AD40AF", fontWeight: "700" }} >

                {" "}
                Register
                
              </Text>
         
          </TouchableOpacity> 
          </View>
        </View>
      </SafeAreaView>
   
  );
};
const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
},
backgroundColor:'white'
})
export default LoginScreen;
