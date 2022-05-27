import React from "react"
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image
  } from "react-native";
  // import Logo from "../components/Logo.js";
  let imageLogo = '../assets/weddo.png'

  const { width, height } = Dimensions.get("window");

export default function LandingPage({navigation}){
   

        return(
        <View style={styles.container}>
      <View style={styles.slider}>
        
      
      <Image
        style={styles.image}
        source={require(imageLogo)}
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
              fontSize: 16,
              marginTop: "2%",
            }}
          >
            For a wedding you'll never forget
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AuthenticationChoice")}
          >
            <Text style={styles.textBtn}>Let's go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
        )
    }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0c5da",
    },
    slider: {
      height: 0.5 * height,
      backgroundColor: "#FFD804",
      borderBottomRightRadius: 75,
      backgroundColor:"white",
      width:width
    },
    footer: {
      flex: 1,
    },
    footerContent: {
      flex: 1,
      backgroundColor: "#f0c5da",
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
      width: 150,
      height: 150,
      margin:140
    }
  });