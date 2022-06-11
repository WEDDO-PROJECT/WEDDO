
import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContentRoom from './DrawerSpRoom.js';
import Home from '../../Screens/Home.js';
import WeddingHalls from '../../Screens/WeddingHall';


export default function  DrawerNavigatorClient(props: any) {
    const Drawer = createDrawerNavigator();

    return (

        <Drawer.Navigator screenOptions={{ headerShown :false,}} drawerContent={props => <DrawerContentRoom {...props} />}>  

          <Drawer.Screen name="Home" component={WeddingHalls} />
          {/* <Drawer.Screen name="EditProfileSPRoom" component={EditProfileSPRoom} /> */}
          
        </Drawer.Navigator>

    )

}