import React, { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import InputField from "../components/input.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/button.js";
import Background from "../assets/Background.webp";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tel, setTel] = useState("");
  const register = async () => {
    const Register = {
      name: name,
      email: email,
      tel: tel,
      password: password,
    };
    axios
      .post("http://192.168.11.4:3000/api/users", Register)
      .then((response) => {
        const data = response.data.result[0];
        StorageUtils.storeData("user", data);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CreateName = (value) => {
    setName(value);
  };
  const createEmail = (value) => {
    setEmail(value);
  };
  const createTel = (value) => {
    setTel(value);
  };
  const createPass = (value) => {
    setPassword(value);
  };
  const onconfirmPassword = (value) => {
    setConfirmPassword(value);
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
        <View style={{ alignItems: "center" }}></View>
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
          setValue={CreateName}
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
          label={"Email ID"}
          setValue={createEmail}
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
          setValue={createPass}
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
        <InputField
          label={"Phone Number"}
          setValue={createTel}
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
        <CustomButton
          label={"Register"}
          onPress={() => navigation.navigate("Home")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;
