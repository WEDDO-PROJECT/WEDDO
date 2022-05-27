import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Dimensions,
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
    width: 300,
    height: 50,
    backgroundColor: "#FFD804",
    marginBottom: "4%",
  },
  containerInput: {
    margin: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomView: {
    //position: "absolute",
    flexDirection: "row",
    //flex: 1,
    //marginBottom: "25%",
    alignItems: "center",
    //marginTop: "5%",
    top: "1%",
    alignSelf: "center",
  },

  btnChangenbr: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textChange: {
    color: "black",
    alignItems: "center",
    fontSize: 15,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    borderRadius: 10,
    width: 200,
    backgroundColor: "#FFF",
    fontSize: 20,
    height: 55,
    padding: "5%",
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
    alignItems: "center",
    color: "black",
    textAlign: "center",
  },
  textResend: {
    alignItems: "center",
    fontSize: 15,
  },
});

function VerifyOTPScreen({ route, navigation }) {
  let textInput = useRef(null);
  let clockCall = null;
  const defaultCountdown = 30;
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [code, setCodeNumber] = useState("");
  const [responseData, setResponsedata] = useState("");
  const [testok, setTestok] = useState(false);
  const [codeHandler, setcodeHandler] = useState("");

  const [phone, setPhone] = useState();
  useEffect(() => {
    // setPhone(route.params.phoneNumber);
    console.log(phone + "ggvgfgfgf");
  }, []);

  const Callforput = () => {
    const x = {
      mobile: phone,
      otp: code,
    };
    console.log(x);
    if (code.length === 4) {
      console.log("Hello word ");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .put(BasePath + "/mobilenumbers/otp", x, config)
        .then((response) => {
          setResponsedata(response.data);
          setCodeNumber("");
        })
        .catch((error) => {
          console.log(error.response);
          setResponsedata(error.response.data);
        });
      setTestok(false);
    }
  };

  useEffect(() => {
    if (testok == true) {
      Callforput();
    }
    if (responseData !== "") {
      setcodeHandler(responseData);
      setTimeout(function () {
        setcodeHandler("");
      }, 1000);
    }
  }, [testok, responseData]);

  const Ok = () => {
    navigation.navigate("CategoryChoice");
    //console.log("test passer avec succees")
    //setTestok(true);
  };

  const onChangeCode = (number) => {
    setCodeNumber(number);
  };

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const axiosApiCall = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("work");
    axios
      .post(BasePath + "/mobilenumbers/otp", phone, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onResendOTP = () => {
    axiosApiCall();
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };

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
            Verification code is sent
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              alignSelf: "center",
              marginTop: "2%",
            }}
          >
            please enter the 4 digits code
          </Text>
          <View style={styles.containerInput}>
            <View style={styles.containerBox}>
              <TextInput
                value={code}
                onChangeText={onChangeCode}
                keyboardType="numeric"
                style={styles.input}
                maxLength={4}
              />
              {/* {console.log("responseData", responseData )}
              {console.log("test code2", codeHandler)} */}
              {codeHandler !== ""
                ? Alert.alert("Message", codeHandler, [
                    {
                      text: "OK",
                      onPress: () => {
                        if (codeHandler == "OTP is verified Successfully") {
                          navigation.navigate("AddUser", {
                            mobilenumber: phone,
                          });
                        }
                        setcodeHandler("");
                      },
                    },
                  ])
                : null}
            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={Ok}>
              <View style={styles.btnChangenbr}>
                <Text style={styles.textChange}>Verifier</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onResendOTP}>
              <View style={styles.btnResend}>
                <Text
                  style={[
                    styles.textResend,
                    {
                      color: enableResend ? "#FFD804" : "black",
                    },
                  ]}
                >
                  Resend ({countdown})
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default VerifyOTPScreen;
