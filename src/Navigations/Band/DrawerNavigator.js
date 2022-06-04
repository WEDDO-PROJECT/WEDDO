import ProfileRoom from './SpRoomProfile.js'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContentRoom from './DrawerSpRoom.js';
import EditProfileSPRoom from './EditProfileRoom.js';


export default function  DrawerNavigatorSP(props: any) {
    const Drawer = createDrawerNavigator();

    return (

        <Drawer.Navigator screenOptions={{ headerShown :false,}} drawerContent={props => <DrawerContentRoom {...props} />}>  

          <Drawer.Screen name="ProfileRoom" component={ProfileRoom} />
          {/* <Drawer.Screen name="EditProfileSPRoom" component={EditProfileSPRoom} /> */}
          
        </Drawer.Navigator>

    )

}