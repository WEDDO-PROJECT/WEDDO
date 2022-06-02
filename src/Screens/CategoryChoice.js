import React from "react";
import {
  StyleSheet,
  ImageBackground,
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
const  CategoryChoice =({navigation})=>{
  

        return (
    <View style={styles.container}>
    <ImageBackground
      style={{
        width: width,
        height: 0.3 * height,
      }}
      source={back}
      resizeMode="cover"
    >
        <View style={styles.slider}></View>
    </ImageBackground>
            
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
                  onPress={() => navigation.navigate("RegisterScreen")}
                >
                  <Image
                   source={require("../assets/user.png")}
                    style={styles.image}
                  />
                  <Text style={styles.text}>User</Text>
                </TouchableOpacity>
      
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("RegisterSP")}
                >
                  <Image
                   source={require("../assets/SP.png")}
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
      backgroundColor: "white",
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
      backgroundColor: "white",
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
    image: { height: 100, width: 100, marginLeft: 20 },
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: 300,
    },
  });
  

  export default CategoryChoice;