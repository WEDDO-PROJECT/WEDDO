
import ProfileRoom from '../../Screens/SpRoomProfile.js';
import Calendar from '../../components/spProfileComponents/Calendar'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContentRoom from './DrawerSpRoom.js';


export default function  DrawerNavigatorSP(props) {
    const Drawer = createDrawerNavigator();

    return (

        <Drawer.Navigator screenOptions={{ headerShown :false,}} drawerContent={props => <DrawerContentRoom {...props} />}>  

          <Drawer.Screen name="ProfileRoom" component={ProfileRoom} />
          <Drawer.Screen name="Calendar" component={Calendar} />
          
        </Drawer.Navigator>

    )

}