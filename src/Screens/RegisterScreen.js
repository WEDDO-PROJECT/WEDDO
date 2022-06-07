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
import axios from 'axios'
import StorageUtils from "../Utils/StorageUtils.js";

import BasePath from "../constants/BasePath";

const RegisterScreen = ({ navigation }) => {
const [name,setName]=useState(null)
const [password,setPassword]=useState(null)
const [email,setEmail]=useState(null)
const [confirme_Password,setConfirme_Password]=useState(null)
const [tel_number,setTel_number]=useState(null)



let charactersRegex = /^[a-zA-z]+$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const [data, setData] = React.useState({
  tel: "",
  password: "",
  name: "",
  email:"",
  nameChange: false,
  passwordChange: false,
  emailChange:false,
  telChange: false,
});
const send=async()=>{
  let person={
    email:data.email,
    name:data.name,
    password:data.password,
    tel_number:data.tel
  }
  axios.post(BasePath + '/api/user/signup',person)

  .then(res=>{
    console.log(res.data);
    const userdata =res.data.result[0]
     StorageUtils.storeData('user',userdata)
     StorageUtils.storeData('userRole','client')
    navigation.navigate("drawer")
  })
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
const nameChange = (val) => {
  if (val.length > 3 && charactersRegex.test(val)) {
    setData({
      ...data,
      name: val,
      nameChange: true,
    });
  } else {
    setData({
      ...data,
      name: val,
      nameChange: false,
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
       <View>
        <InputField
          label={"Name"}
          setValue={nameChange}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        {!data.nameChange && data.name!=="" ? 
              <Text style={{color: 'red' , marginTop : -18}}>Name must only contains Characters </Text>
            : <Text></Text>} 
        </View>
        <View>
        <InputField
          label={"Email "}

          setValue={setEmail}

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
        {!data.emailChange && data.email!=="" ? 
              <Text style={{color: 'red' , marginTop : -18}}>email must be correct</Text>
            : <Text></Text>} 
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
        />
        {!data.telChange && data.tel!=="" ? 
              <Text style={{color: 'red' , marginTop : -18}}>phone must have 8 numbers </Text>
            : <Text></Text>} 
        </View>
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
           {!data.passwordChange && data.password!=="" ? 
              <Text style={{color: 'red' , marginTop : -18}}>password not strong enough</Text>
            : <Text></Text>} 
          </View>
        <View>
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
       </View>

       <View>

<TouchableOpacity
      disabled={
        !data.cinChange &&
        !data.telChange &&
        !data.nameChange &&
        !data.passwordChange &&
        !data.emailChange 

        }  onPress={send} 
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
