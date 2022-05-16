import {
  NativeModules,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Platform,
  TouchableOpacity,
  text,
  StatusBar,
  Image,
  TextInput,
  onChangeText,
  onChangeNumber,
  Button,
  Alert,
} from "react-native";
import * as React from "react";
import { Component } from "react";
// class Login extends Component {
//   render() {
//     return (
//       <SafeAreaView>
//         <TextInput
//           style={styles}
//           onChangeText={onChangeText}
//           value={text}
//         />
//         <TextInput
//           style={styles}
//           onChangeText={onChangeNumber}
//           value=""
//           placeholder="useless placeholder"
//           keyboardType="numeric"
//         />
//       </SafeAreaView>
//     );
//   }
// }
// export default Login;

// import { View, Text } from 'react-native'
// import React from 'react'

const Login = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState(null);
  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Your email or username..."
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Your password..."
          secureTextEntry
          autoCorrect={false}
        />
        <Button
          title="Login"
          onPress={() => Alert.alert(`Wrong Password or Email? Check From your informiation Please...!`)}
 
        />

      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;
