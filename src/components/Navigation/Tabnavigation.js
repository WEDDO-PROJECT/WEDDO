import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";   
import Feather from "react-native-vector-icons/Feather";
import NavHome from '../homeComponents/NavHome';
import Basket from '../../Screens/Basket';
import Home from '../../Screens/Home';

const Tab= createBottomTabNavigator();
function Tabnavigation(props) {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: { 
                backgroundColor: 'white',
                height: 60,
                position: 'absolute',
                bottom: 16,
                right: 16,
                left: 16,
                borderRadius: 10
            },
            tabBarInactiveTintColor: '#D49B35',
            tabBarActiveTintColor: '#D49B35',
            tabBarShowLabel:true,
        }}>
            <Tab.Screen name='Home' component={NavHome} options={{
                tabBarIcon: ({color,size}) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                )
            }} />
            <Tab.Screen name='Selected' component={Basket} options={{
                tabBarIcon: ({color,size}) => (
                    <Ionicons name="bookmarks-outline" color={color} size={size} />
                )
            }} />
        </Tab.Navigator>
    );
}

export default Tabnavigation;