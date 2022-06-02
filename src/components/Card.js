
import ImagedCardView from "react-native-imaged-card-view";
import { StatusBar, ScrollView, SafeAreaView } from "react-native";



import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View } from "./Themed";

const { height, width } = Dimensions.get("window");
const ratio = 228 / 400;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const CardExemple =({ name, from, to })=>{
    return(<View
        style={{
          height: height / 3.7,
          width: (width * 9.7) / 10,
          borderRadius: 18,
          backgroundColor: "#393834",
          alignItems: "center",
        }}
      >
        <Ionicons style={styles.iconText} name="person-circle-outline" size={18}>
          <Text style={styles.text}>{"Name :"  + name}</Text>
        </Ionicons>
        <Ionicons style={styles.iconText} name="pin-outline" size={18}>
          <Text style={styles.text}>{"Price :"  + from}</Text>
        </Ionicons>
        <Ionicons style={styles.iconText} name="locate-outline" size={18}>
          <Text style={styles.text}>{"location :"  + to}</Text>
        </Ionicons>
        <TouchableOpacity style={styles.button}>
          <Text>Details</Text>
        </TouchableOpacity>
      </View>
    )
}
export default CardExemple;

const styles = StyleSheet.create({
    card: {
     
      
    },
    iconText: {
      padding: 10,
      color: "white",
    },
    text: {
      color: "white",
    },
    button: {
      backgroundColor: "#FFD804",
      marginTop: 10,
      height: 40,
      width: 100,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    buttonView: {
      alignItems: "center",
    },
  });
  