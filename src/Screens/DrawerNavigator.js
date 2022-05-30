import ProfileRoom from './SpRoomProfile.js'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContentRoom from './DrawerSpRoom.js';
import EditProfileSPRoom from './EditProfileRoom.js';


export default function  DrawerNavigator(props: any) {
    const Drawer = createDrawerNavigator();

    return (

        <Drawer.Navigator drawerContent={props => <DrawerContentRoom {...props} />}>         
          <Drawer.Screen name="Home" component={ProfileRoom} />
          {/* <Drawer.Screen name="EditProfileSPRoom" component={EditProfileSPRoom} /> */}
          
        </Drawer.Navigator>

    )

}