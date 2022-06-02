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
 import { LogBox } from 'react-native';
 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
export default function App() {
  return (
    
   
      <Navigator />
      
  
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
 
