<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
// import RegisterScreen from "./src/Screens/RegisterScreen.js";
// import LoginScreen from "./src/Screens/LoginScreen.js";
// import RegisterSP from "./src/Screens/RegisterSP.js";
// import AuthenticationChoice from "./src/Screens/AuthChoice.js";
// import CategoryChoice from "./src/Screens/CategoryChoice.js";
 //import LandingPage from "./src/Screens/LandingPage.js"
// import RegisterScreen from "./src/components/register";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// const Stack = createStackNavigator();
import Navigator from "./src/Navigations/Navigator.js"
=======
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LocalizationContext = React.createContext("");


import Navigator from "./src/Navigations/Navigator.js";

>>>>>>> origin/dev
 import { LogBox } from 'react-native';
 
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
export default function App() {
  
  return (
   
      <NavigationContainer independent={true}>
        <Navigator />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#B22222",
=======
    backgroundColor: "white",
>>>>>>> origin/dev
    alignItems: "center",
    justifyContent: "center",
  },
});
 
