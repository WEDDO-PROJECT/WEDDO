import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RegisterScreen from "./src/Screens/RegisterScreen.js";
import LoginScreen from "./src/Screens/LoginScreen.js";
import RegisterSP from "./src/Screens/RegisterSP.js";
import AuthenticationChoice from "./src/Screens/AuthChoice.js";
import Home from "./src/Screens/Home.js"
import CategoryChoice from "./src/Screens/CategoryChoice.js"
import DrawerNavigator from './src/components/Navigation/DrawerContent.js'
import { NavigationContainer } from '@react-navigation/native';
import Navigator from "./src/Navigations/Navigator.js";

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

 import { LogBox } from 'react-native';
 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
export default function App() {
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
 
