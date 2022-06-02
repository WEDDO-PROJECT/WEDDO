
import React, { useEffect, useState } from "react";
import RegisterScreen from "../Screens/RegisterScreen.js";
import LoginScreen from "../Screens/LoginScreen.js";
import RegisterSP from "../Screens/RegisterSP.js";
import AuthenticationChoice from "../Screens/AuthChoice.js";
import CategoryChoice from "../Screens/CategoryChoice.js";
import LandingPage from "../Screens/LandingPage.js";
import AuthWithPhone from "../Screens/AuthWithPhone.js";
import VerifyOTPScreen from "../Screens/VerifyOTPScreen.js";
import Home from "../Screens/Home.js";
import Profile from "../components/profile.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
export default function Navigator(){

    const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      let data
     // await StorageUtils.retrieveData(userKey).then((value) => (data = value));
      console.log(data);
      if (data === undefined) {
        setUser({ id: "notFound" });
      } else {
        setUser(JSON.parse(data));
      }
    }
    getUser();
  }, []);





  if (user) {
    return (
      // <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user.id == "notFound" ? "LandingPage" : "CategoryChoice"}
        >
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CategoryChoice"
            component={CategoryChoice}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AuthenticationChoice"
            component={AuthenticationChoice}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />
          <Stack.Screen
            name="RegisterSP"
            component={RegisterSP}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />
          

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />

         
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />

        <Stack.Screen
            name="VerifyOTPScreen"
            component={VerifyOTPScreen}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />
         <Stack.Screen
            name="AuthWithPhone"
            component={AuthWithPhone}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />
           <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />

        </Stack.Navigator>
      // </NavigationContainer>
    );
  } else {
    return null;
  }
}