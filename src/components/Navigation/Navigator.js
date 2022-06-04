import React, { useEffect, useState } from "react";
import RegisterScreen from "../../Screens/RegisterScreen.js";
import LoginScreen from "../../Screens/LoginScreen.js";
import LoginScreenSP from "../../Screens/LoginScreenSP.js";
import RegisterSP from "../../Screens/RegisterSP.js";
// import AuthenticationChoice from "../Screens/AuthChoice.js";
import CategoryChoice from "../../Screens/CategoryChoice.js";
import LandingPage from "../../Screens/LandingPage.js";
// import AuthWithPhone from "../Screens/AuthWithPhone.js";
// import VerifyOTPScreen from "../Screens/VerifyOTPScreen.js";
// import StorageUtils from "../Utils/StorageUtils.js";
// import Tabnavigation from "../components/Navigation/Tabnavigation";
//import ProfileScreen1 from "../Screens/profile.js";
import ProfileRoom from "../../Screens/SpRoomProfile";
import drawer from './DrawerContent'
import { createStackNavigator } from "@react-navigation/stack";
// import DrawerNavigator from "../../Screens/DrawerNavigator.js";
import EditProfileSPRoom from "../../Screens/EditProfileRoom.js";
// import CustomDrawer from "./CustomDrawer.js";
import WeddingHallDetails from "../../Screens/WeddingHallDetails.js";
const Stack = createStackNavigator();
export default function Navigator(){
    const [user, setUser] = useState(null);
  useEffect(() => {
    // AsyncStorage.setItem('user',)
    // async function getUser() {
    //   let data=[]
    //  // await StorageUtils.retrieveData(userKey).then((value) => (data = value));
    //   console.log(data);
    //   if (data === undefined) {
        setUser({ id: "notFound" });
        // setUser({ role: "sp" });
    //   } else {
    //     setUser(JSON.parse(data));
    //   }
    // }
    // getUser();
  }, []);
  if (user) {
    return (
        <Stack.Navigator
          initialRouteName={user.id == "notFound" ? "LandingPage" : "DrawerNavigator"}
        >
          <Stack.Screen
            name="drawer"
            component={drawer}
            options={{
              // headerStyle: {
              //   backgroundColor: "transparent",
              // },
              // headerTransparent: true,
              // title: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
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
          {/* <Stack.Screen
            name="AuthenticationChoice"
            component={AuthenticationChoice}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          /> */}
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
            name="LoginScreenSP"
            component={LoginScreenSP}
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
        {/* <Stack.Screen
<Stack.Screen
            name="WeddingHallDetails"
            component={WeddingHallDetails}
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
          /> */}
         <Stack.Screen
            name="ProfileRoom"
            component={ProfileRoom}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />
           <Stack.Screen
            name="EditProfileSPRoom"
            component={EditProfileSPRoom}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />
            <Stack.Screen
            name="MapContent"
            component={MapContent}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          />
           {/* <Stack.Screen
            name="Rooms"
            component={Rooms}
            options={{
              headerStyle: {
                backgroundColor: "transparent",
              },
              headerTransparent: true,
              title: "",
            }}
          /> */}
        </Stack.Navigator>
    );
  } else {
    return null;
  }
}






