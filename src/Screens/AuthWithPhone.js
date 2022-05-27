import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  TextInput
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import BasePath from "../constants/BasePath";
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: 0.21 * height,
    backgroundColor: "#f794e0",
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 75,
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
    width: 150,
    height: 50,
    backgroundColor: "#FFD804",
  },
  phoneInputStyle: {
    //marginLeft: 5,
    //flex: 1,
    height: 50,
    width: 80,
  },
  containerInput: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "center",
    borderBottomWidth: 1.5,
    width: 300,
    top:"20%",
    //backgroundColor:"red"
  },
  opennDialog: {
    //flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor:"red"
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    //top:"150%"
    //marginTop:"50%"
    //marginTop:"30%",
    backgroundColor:"red"
  },
  textContinue: {
    color: "black",
    alignSelf: "center",
  },
}); 

export default function AuthWithPhone ({navigation}){
    let textInput = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [focus, setFocusInput] = useState(true);
    const [Validate, setValidate] = useState("");
    const [fortest, setTest] = useState(false);
    // useEffect(() => {
    //   if (fortest == true) {
    //     axiosApiCall(phoneNumber);
    //   }
    // }, [fortest]);
  
    const axiosApiCall = () => {
        navigation.navigate("VerifyOTPScreen", {
            phoneNumber,
          });
    //   if (phoneNumber.length === 8) {
    //     console.log("show ");
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };
    //     console.log("work");
    //     axios
    //       .post("http://192.168.28.15:3000/api/sp/AuthWithPhone")
    //       .then((response) => {
    //         setValidate(response.data);
    //         setPhoneNumber("")
    //         navigation.navigate("VerifyOTPScreen", {
    //           phoneNumber,
    //         });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    };
  
    const test = () => {
      if (phoneNumber.length == 8) {
        setTest(true);
        
      }
  
      //setPhoneNumber("")
    };
  
    const onChangePhone = (number) => {
      setPhoneNumber(number);
    };
  
    const onPressContinue = () => {
      if (phoneNumber.length == 8) {
        navigation.navigate("VerifyOTPScreen", {
          firstName: "",
        });
      }
    };
  
    const onChangeFocus = () => {
      setFocusInput(true);
    };
  
    const onChangeBlur = () => {
      setFocusInput(false);
    };
  
    useEffect(() => {
      textInput.focus();
    }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.slider}></View>
        <View style={styles.footer}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "#f794e0",
            }}
          />
          <View style={styles.footerContent}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 24,
                alignSelf: "center",
                marginTop: "20%",
              }}
            >
               Enjoy your adventure
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                alignSelf: "center",
                marginTop: "2%",
              }}
            >
              Register with your phone number
            </Text>
            <View
            style={[
              styles.containerInput,
              {
                borderBottomColor: "#393834",
              },
            ]}
          >
            <View style={styles.opennDialog}>
              <Text>{"+216 | "}</Text>
            </View>
            <TextInput
              ref={(input) => (textInput = input)}
              style={styles.phoneInputStyle}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={onChangePhone}
              secureTextEntry={false}
              onFocus={onChangeFocus}
              onBlur={onChangeBlur}
              maxLength={8}
            />
            </View>
            {Validate === "OTP is send successufully"
              ? Alert.alert("OTP is send successufully")
              : null}
              <View style={{top:"30%"}}>
            <TouchableOpacity onPress={axiosApiCall}>
              <View
                style={[
                  styles.btnContinue,
                  {
                    backgroundColor: phoneNumber ? "#FFD804" : "#979A9A",
                  },
                ]}
              >
                <Text style={styles.textContinue}>Continue</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
}