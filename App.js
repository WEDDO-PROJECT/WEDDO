import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryChoice from "./src/Screens/CategoryChoice.js"
import DrawerNavigator from './src/components/Navigation/DrawerContent.js'

const LocalizationContext = React.createContext("");


import Navigator from "./src/Navigations/Navigator.js";

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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
 
