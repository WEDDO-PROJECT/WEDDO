import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navigator from "./src/components/Navigation/Navigator";
const LocalizationContext = React.createContext("");
import Profile from "./src/Screens/profile";
 import { LogBox } from 'react-native';
 
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
export default function App() {
  
  return (
   
      <NavigationContainer independent={true}>
        <Profile/>
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
 
