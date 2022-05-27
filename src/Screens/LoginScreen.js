import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/button.js";
import Logo from "../components/Logo.js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import InputField from "../components/input.js";
import Background from "../assets/Background.webp";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            onPress={() => navigation.navigate("Home")}
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
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default LoginScreen;
