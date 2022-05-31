import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList,StyleSheet } from '@react-navigation/drawer'

function CustomDrawer(props) {
    return (
        <View style = {{flex:1}}>
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#f0c5da'}}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        </View>  
    );
}
// const styles= StyleSheet.create({

// })
export default CustomDrawer;