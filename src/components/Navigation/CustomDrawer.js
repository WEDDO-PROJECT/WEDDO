import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList,StyleSheet } from '@react-navigation/drawer'

function CustomDrawer(props) {
    return (
        <View style = {{flex:1}}>
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#D49B35'}}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        </View>  
    );
}
// const styles= StyleSheet.create({

// })
export default CustomDrawer;