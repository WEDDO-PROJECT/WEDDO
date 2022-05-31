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
import SpRoomProfile from "./src/Screens/SpRoomProfile.js"
 //import Navigator from "./src/Navigations/Navigator.js"
//  import * as Localization from "expo-localization";
const LocalizationContext = React.createContext("");
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigatorSP from "./src/Screens/DrawerNavigator.js";
import Navigator from "./src/Navigations/Navigator.js";

 import { LogBox } from 'react-native';
 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
export default function App() {
  // const [locale, setLocale] = React.useState(Localization.locale);
  // const localizationContext = React.useMemo(
  //   () => ({
  //     t: (scope, options) => i18n.t(scope, { locale, ...options }),
  //     locale,
  //     setLocale,
  //   }),
  //   [locale]
  // );
  return (
    //   <NavigationContainer>
    // <Stack.Navigator>
    //        <Stack.Screen
    //           name="Login"
    //           component={LoginScreen}
    //         />
    //         <Stack.Screen
    //           name="Register"
    //           component={RegisterScreen}
    //         />
    // <Navigator />
    
      <NavigationContainer independent={true}>
        <Navigator />
         {/* <DrawerNavigator /> */}
         
         
      </NavigationContainer>
    
    
 
    
    
      
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
 
