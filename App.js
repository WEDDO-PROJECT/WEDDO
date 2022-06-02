import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import React from "react";
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
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
export default function App() {
  return (
    
      <NavigationContainer independent={true}>
        <Navigator />
         {/* <DrawerNavigator /> */}    
      </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B22222",
    alignItems: "center",
    justifyContent: "center",
  },
});
 
