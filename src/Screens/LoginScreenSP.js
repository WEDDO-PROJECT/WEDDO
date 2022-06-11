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
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/button.js";
import Logo from "../components/Logo.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InputField from "../components/input.js";
import Background from "../assets/Background.webp";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// const onConfirmPressed = () => {
//   navigation.navigate("Home");
// };
import Icon from "react-native-vector-icons/FontAwesome";
import StorageUtils from "../Utils/StorageUtils.js";


let imageLogo = require('../assets/Logo.png')

const { width, height } = Dimensions.get("window");
import BasePath from "../constants/BasePath";
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

const send=()=>{
  let person={email:email, password:password}
  axios.post(BasePath + '/api/sp/login',person)
   .then(res=>{
    if(res.data==="Please fill all the fields" || res.data==="email not found" || res.data==="login failed" ){
        setErrorMsg(res.data)
    }else {
      const userdata =res.data
      StorageUtils.storeData('user',userdata)
      StorageUtils.storeData('weddingHall',userdata)
      StorageUtils.storeData('userRole','sp')
      if (!userdata.status){
        navigation.navigate("Status")
      }else {
        if(userdata.category=='Hairdresser'){
          navigation.navigate("DrawerNavigatorHairdresser")
        }else if(userdata.category=='partyroom'){
          navigation.navigate("DrawerNavigator")
        }else if(userdata.category=='Photographer'){
          navigation.navigate("DrawerNavigatorPhotographer")
        } if(userdata.category=='MusicalBand'){
          navigation.navigate("DrawerNavigatorMusicalBand")
        }
      }
      
    }
   
 })
  
}
  const { height } = useWindowDimensions();
  // const navigation = useNavigation();
  //   const myIcon = <Icon name="bird" size={30} color="#900" />;
  return (
    
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
          <Image
            style={styles.image}
            source={imageLogo}
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
                color="#d49b35"
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
                color="#d49b35"
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
                    backgroundColor: "#d49b35",
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
            style={{ textAlign: "center", color: "#EBBAD2", marginBottom: -20 }}
          >
            
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {/* /<Text>New to the app?</Text> */}

             <TouchableOpacity
              title="Register"
              onPress={() => navigation.navigate("RegisterSP")}
            > 
              <Text style={{ color: "#d49b35", fontWeight: "700" }}>
                {" "}
                Register
              </Text>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Google height={24} width={24} />*/}
          </TouchableOpacity> 
          </View>
        </View>
      </SafeAreaView>
  );
};
export default LoginScreen;

//faceBookLogin
/*        <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
        
          >
            Login with Facebook
          </Icon.Button>
          */
//faceBookLogin
/*        <Icon.Button
            name="google"
            backgroundColor="red"
        
          >
            Login with Google
          </Icon.Button>
          */
          const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: "#d49b35",
            },
            slider: {
              height: 0.5 * height,
              backgroundColor: "#B22222",
              borderBottomRightRadius: 75,
              backgroundColor:"white",
              width:width
            },
            footer: {
              flex: 1,
            },
            footerContent: {
              flex: 1,
              backgroundColor: "#d49b35",
              borderTopLeftRadius: 75,
              alignItems: "center",
            },
            textBtn: {
              textAlign: "center",
              margin: 15,
              fontWeight: "bold",
              color: "black",
            },
            button: {
              borderRadius: 50,
              //position:"absolute",
              marginTop: "15%",
              alignSelf: "center",
              width: "50%",
              height: "15%",
              backgroundColor: "white",
            },
            image: {
              alignSelf: "center",
              width: 300,
              height: 150,
              margin:30,
              marginTop:0
            }
          });