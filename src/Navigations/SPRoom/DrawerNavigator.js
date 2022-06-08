
import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContentRoom from './DrawerSpRoom.js';
import ProfileRoom from '../../Screens/SpRoomProfile.js';
import Calendar from '../../components/spProfileComponents/Calendar'
import MapContent from '../../Screens/Map';
import Rooms from '../../Screens/Rooms.js';
import WeddingHallDetails from '../../Screens/WeddingHallDetails'

export default function  DrawerNavigatorSP(props: any) {
    const Drawer = createDrawerNavigator();

    return (

        <Drawer.Navigator screenOptions={{ headerShown :false,}} drawerContent={props => <DrawerContentRoom {...props} />}>  

          <Drawer.Screen name="ProfileRoom" component={WeddingHallDetails} />
          <Drawer.Screen name="Calendar" component={Calendar} />
          <Drawer.Screen name="MapContent" component={MapContent} />
          {/* <Drawer.Screen name="Salles" component={Rooms} /> */}
          {/* <Drawer.Screen name="EditProfileSPRoom" component={EditProfileSPRoom} /> */}
          
        </Drawer.Navigator>

    )

}