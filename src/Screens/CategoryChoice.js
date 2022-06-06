import React from "react";
import {
  StyleSheet,
  // ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import back from "../assets/back.png";
const { width, height } = Dimensions.get("window");
export default function  CategoryChoice ({navigation}){
  

        return (
    <View style={styles.container}>
       
            <View style={styles.footer}>
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  
                }}
              />
              <View style={styles.footerContent}>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 24,
                    alignSelf: "center",
                    marginTop: "10%",
                  }}
                >
                  Choose your Role
                </Text>
               
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Image
                   source={require("../assets/icon-coupleremovebg.png")}
                    style={styles.image}
                  />
                  <Text style={styles.text}>Client</Text>
                </TouchableOpacity>
      
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("LoginScreenSP")}
                >
                  <Image
                   source={require("../assets/SPremovebg.png")}
                    style={styles.image}
                  />
                  <Text style={styles.text}>Service Provider</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        );
        
    }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#D49B35",
    },
    slider: {
      
      borderBottomRightRadius: 75,
      width:width
    },
    footer: {
      flex: 1,
    },
    footerContent: {
      flex: 1,
      backgroundColor: "#D49B35",
      borderTopLeftRadius: 75,
    },
    textBtn: {
      textAlign: "center",
      margin: 15,
      fontWeight: "bold",
      color: "black",
    },
    choiceText: {
      alignItems: "center",
      flexDirection: "row",
      fontSize: 28,
      color: "black",
      marginTop: 100,
      fontWeight: "bold",
    },
    text: {
      fontWeight: "bold",
      fontSize: 25,
      color: "black",
      marginLeft: 30,
    },
    button: {
      alignItems: "center",
      flex: 0.3,
      flexDirection: "row",
      backgroundColor: "white",
      width: "90%",
      borderRadius: 15,
      marginTop: 45,
      borderBottomColor: "black",
      borderWidth: 2,
      marginLeft: "5%",
    },
    image: { height: 120, width: 100, marginLeft: 10 },
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: 300,
    },
  });
  

  // export default CategoryChoice;