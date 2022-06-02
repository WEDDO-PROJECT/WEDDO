import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import React from "react";
<<<<<<< HEAD
import RegisterScreen from "./src/Screens/RegisterScreen.js";
import LoginScreen from "./src/Screens/LoginScreen.js";
import RegisterSP from "./src/Screens/RegisterSP.js";
import AuthenticationChoice from "./src/Screens/AuthChoice.js";
import Home from "./src/Screens/Home.js"
import CategoryChoice from "./src/Screens/CategoryChoice.js"
import DrawerNavigator from './src/components/Navigation/DrawerContent.js'
import Navigator from "./src/Navigations/Navigator.js"
import SpRoomProfile from "./src/Screens/SpRoomProfile.js"
 //import Navigator from "./src/Navigations/Navigator.js"
//  import * as Localization from "expo-localization";
const LocalizationContext = React.createContext("");
import { SafeAreaProvider } from 'react-native-safe-area-context';
 import { LogBox } from 'react-native';
// Ignore log notification by message
=======

const LocalizationContext = React.createContext("");


import Navigator from "./src/Navigations/Navigator.js";

 import { LogBox } from 'react-native';
 
>>>>>>> 15fc1e6fa34a4148248512aa681f5255064e0144
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
export default function App() {
<<<<<<< HEAD
  return (
    
      <NavigationContainer independent={true}>
        <Navigator />
         {/* <DrawerNavigator /> */}    
      </NavigationContainer>  
=======
  
  return (
   
      <NavigationContainer independent={true}>
        <Navigator />
      </NavigationContainer>
>>>>>>> 15fc1e6fa34a4148248512aa681f5255064e0144
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#B22222",
=======
    backgroundColor: "white",
>>>>>>> 15fc1e6fa34a4148248512aa681f5255064e0144
    alignItems: "center",
    justifyContent: "center",
  },
});
 
