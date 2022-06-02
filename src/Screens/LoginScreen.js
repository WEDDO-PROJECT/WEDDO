import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
// import iP from '../constants/BasePath.js';
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/button.js";
import Logo from "../components/Logo.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InputField from "../components/input.js";
import Background from "../assets/Background.webp";
import axios from "axios";
import BasePath from "../constants/BasePath";
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
// import StorageUtils from "../Utils/StorageUtils.js";
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const send=()=>{
  let person={email:email, password:password}
  console.log(person);
  axios.post(BasePath + '/api/user/login',person)
  .then(res=>{console.log(res.data)
    //  if(res.data[0]==='succesfully connected')
    AsyncStorage.setItem('user',JSON.stringify(res.data))
  // const userdata =res.data
  // StorageUtils.storeData('user',userdata)
    navigation.navigate("drawer")

  })
  
}
  const { height } = useWindowDimensions();
  return (
    <ImageBackground
      style={{
        width: "100%",
        height: height,
      }}
      source={Background}
      resizeMode="cover"
    >
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
          <InputField
            fieldButtonLabel={"Forgot?"}
            fieldButtonFunction={() => {
              onConfirmPressed();
            }}
          />
          <CustomButton
            label={"Login"}
            title="to homePage"
            // onPress={onLoginPressed }
            onPress={send}
          />
          <Text
            style={{ textAlign: "center", color: "#EBBAD2", marginBottom: 20 }}
          >
            Or, login with ...
          </Text>


          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >

             <TouchableOpacity
              title="Register"
              onPress={() => navigation.navigate("RegisterScreen")}
            > 
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {" "}
                Register
                
              </Text>
           
          </TouchableOpacity> 
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default LoginScreen;
