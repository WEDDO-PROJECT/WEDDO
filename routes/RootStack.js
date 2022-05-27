import React from "react";
// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../src/Screens/Home.js"
import Login from "../src/Screens/LoginScreen.js"
const {primary,tertiary}=Colors
import { Colors } from "react-native/Libraries/NewAppScreen";
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerOptions:{
              backroundColor:"transparent"
          },
          headerTintColor:tertiary,
          headerTransparent:true,
          headerTitle:"",
          headerLeftContainerStyle:{
              paddingLeft:20
          }
      }}
      initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
      
      </NavigationContainer>
  );
};
export default RootStack;

