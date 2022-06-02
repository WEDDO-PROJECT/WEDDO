import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../Screens/Home";
import CalendarInput from "./Calendar";


const Stack = createStackNavigator();
const NavHome = () => {
  return (
    <Stack.Navigator independent={true} screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Calendar" component={CalendarInput} />
      
    </Stack.Navigator>
  );
};

export default NavHome;