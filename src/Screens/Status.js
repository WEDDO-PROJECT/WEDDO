import React,{useEffect, useState} from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image
  } from "react-native";
  // import Logo from "../components/Logo.js";
  let imageLogo = require('../assets/Logo.png')

  const { width, height } = Dimensions.get("window");

export default function Status({navigation}){
  useEffect(() =>{
    AsyncStorage.clear()
  },[])

        return(
        <View style={styles.container}>
      <View style={styles.slider}>
        
      
      <Image
        style={styles.image}
        source={imageLogo}
      />
          
      </View>
      <View style={styles.footer}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "white",
          }}
        />
        <View style={styles.footerContent}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 24,
              marginTop: "20%",
            }}
          >
            Welcome to WEDDO{" "}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 25,
              marginTop: "2%",
            }}
          >
            Please wait for the Admin to Accept you into the platform!
          </Text>
          
        </View>
      </View>
    </View>
        )
    }
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
      margin:140
    }
  });