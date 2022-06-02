import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "../../Screens/LoginScreen";
// import Home from "../../Screens/Home";
import CustomDrawer from "./CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Tabnavigation from '../Navigation/Tabnavigation.js';
 import Navigator from "../../Navigations/Navigator"
 import Checklist from "../../Screens/Checklist.js";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  console.log('hello');
  return (
    <Drawer.Navigator 
      drawerContent = {props => <CustomDrawer {...props}/>}
      screenOptions = {{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
        drawerActiveBackgroundColor: '#fff',
        drawerActiveTintColor: '#D49B35',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15
        } 
      }}
      // initialRouteName="Home"
      //  >
      // initialRouteName="TabNav" 
      >
        
      <Drawer.Screen name="Home" component={Tabnavigation} options = {{
        drawerIcon:({color}) => (
          <Ionicons name ="home-outline" size={22} color={color }/>
        )
      }} />
      <Drawer.Screen name="Checklist" component={Checklist} options = {{
        drawerIcon:({color}) => (
          <Ionicons name="reader-outline" size={22} color={color} />
        )
      }} />
      
      <Drawer.Screen name="About Us" component={LoginScreen} options = {{
        drawerIcon:({color}) => (
          <Ionicons name="alert-circle-outline" size={22} color={color} />
        )
      }} />
      <Drawer.Screen name="Settings" component={LoginScreen} options = {{
        drawerIcon:({color}) => (
          <Ionicons name="settings-outline" size={22} color={color} />
        )
      }} />
      <Drawer.Screen name="Logout" component={LoginScreen} options = {{
        drawerIcon:({color}) => (
          <Ionicons name="log-out-outline" size={22} color={color} />
        )
      }} />
      
      
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;