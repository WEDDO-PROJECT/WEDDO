import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';

function Settings(props) {
    return (
        <View style={styles.container}>
            <Text>Change username</Text>
            <TextInput placeholder='new username' />
            <Text>Change password</Text>
            <TextInput placeholder='current password' />
            <TextInput placeholder='new password' />
            <TextInput placeholder='current password' />
            <Text>Change email</Text>
            <TextInput placeholder='new email' />
        </View>
    );
}

export default Settings;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:   'center',
      justifyContent: 'center',
    
    },
})