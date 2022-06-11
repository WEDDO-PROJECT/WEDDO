import { StyleSheet, Text, View } from "react-native";

import React from "react";
import RegisterScreen from "./src/Screens/RegisterScreen.js";
import Notification from "./src/Screens/Notification.js";
import RegisterSP from "./src/Screens/RegisterSP.js";
import AuthenticationChoice from "./src/Screens/AuthChoice.js";
import Home from "./src/Screens/Home.js";
import CategoryChoice from "./src/Screens/CategoryChoice.js";
import DrawerNavigator from "./src/components/Navigation/DrawerContent.js";

import i18n from "i18n-js";
import { fr, en } from "./src/Utils/Localization/I18n";
import * as Localization from "expo-localization";
import { LocalizationContext } from "./src/Utils/Localization/LocalizationComponent";
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
import SpRoomProfile from "./src/Screens/SpRoomProfile.js";
//import Navigator from "./src/Navigations/Navigator.js"
//  import * as Localization from "expo-localization";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import Navigator from "./src/Navigations/Navigator.js";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
export default function App() {
  i18n.fallbacks = true;
  i18n.translations = { fr, en };
  const [locale, setLocale] = React.useState(Localization.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );
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

    <LocalizationContext.Provider value={localizationContext}>
      <Navigator />
    </LocalizationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    backgroundColor: "#B22222",

    alignItems: "center",
    justifyContent: "center",
  },
});
