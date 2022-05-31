import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Screens/Home";
import CalendarInput from "./Calendar";


const Stack = createNativeStackNavigator();

const NavHome = () => {
  return (
    <Stack.Navigator independent={true} screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="Calendar" component={CalendarInput} />
      
    </Stack.Navigator>
  );
};

export default NavHome;