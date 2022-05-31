import React from "react"
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
  } from "react-native";

  const { width, height } = Dimensions.get("window");

export default function LandingPage({navigation}){
   

        return(
        <View style={styles.container}>
      <View style={styles.slider}>
        
        <Text style={{
           color: "black",
           fontWeight: "bold",
           fontSize: 45,
           margin: "30%", 
           
        }}>WEDDO</Text>
      </View>
      <View style={styles.footer}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "#B22222",
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
      backgroundColor: "white",
    },
    slider: {
      height: 0.5 * height,
      backgroundColor: "#B22222",
      borderBottomRightRadius: 75,
      backgroundColor:"#B22222",
      width:width
    },
    footer: {
      flex: 1,
    },
    footerContent: {
      flex: 1,
      backgroundColor: "#f5f5dc",
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
      backgroundColor: "#B22222",
    },
  });