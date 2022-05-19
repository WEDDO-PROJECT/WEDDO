import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RegisterScreen from "./src/Screens/RegisterScreen.js";
// import RegisterScreen from "./src/components/register";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// const Stack = createStackNavigator();
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

    <View style={styles.container}>
      <RegisterScreen />
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
    </View>
    // </Stack.Navigator>
    // </NavigationContainer>
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
