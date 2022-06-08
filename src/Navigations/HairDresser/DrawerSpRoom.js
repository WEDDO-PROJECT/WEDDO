import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
   
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import StorageUtils from '../../Utils/StorageUtils';

const  DrawerContentRoom = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const paperTheme = useTheme();

    useEffect(() => {
        async function getUser() {
          let data
          await StorageUtils.retrieveData('user').then((value) => (data = JSON.parse(value)));
         console.log(data);
          if (data === undefined) {
           console.log('not found')
          } else {
    
              setName(data.owner_name)
              //console.log(data.'owner_name')
              setEmail(data.email)
            //  console.log(data.email)
             
          }
        }
        getUser();
      }, []);

    //const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        
        <View style={{flex:1}}>
            <DrawerContentScrollView style={styles.drawerSection}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                        <Image
                                source={require("../../assets/SP.png")}
                                    style={styles.image}
                          />
                            <View style={{marginLeft:20, flexDirection:'column'}}>
                                <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>

                        
                    </Drawer.Section >

                    <Drawer.Section style={styles.drawerSection}>
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={35}
                                />
                            )}
                            label="Profile"
                           onPress={() => {navigation.navigate('ProfileRoom')}}
                        />
                        
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={35}
                                />
                            )}
                            label="Calendar"
                           onPress={() => {navigation.navigate('Calendar')}}
                        />
                        
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={35}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {navigation.navigate('LandingPage')}}
                />
            </Drawer.Section>
        </View>
    );
}
    

export default DrawerContentRoom;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
         
    image: { height: 80, width: 80, borderRadius:60 },
  });