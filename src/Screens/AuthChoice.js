import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SocialIcon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";


const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: 0.25 * height,
    backgroundColor: "#f794e0",
    borderBottomRightRadius: 75,
    width:width,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 75,
  },
  textBtn: {
    textAlign: "center",
    margin: 15,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    borderRadius: 50,
    //position:"absolute",
    marginTop: "15%",
    alignSelf: "center",
    width: 300,
    height: 50,
    backgroundColor: "#f794e0",
    marginBottom: "4%",
  },
  btnG: {
    // position:"absolute",
    borderRadius: 50,
    alignSelf: "center",
    width: 300,
    height: 50,
    backgroundColor: "#DD4B39",
    //marginTop:440,
    marginBottom: "4%",
  },

  btnF: {
    //position:"absolute",
    borderRadius: 50,
    width: 300,
    height: 50,
    alignSelf: "center",
    backgroundColor: "#3b5998",
    // marginTop:500,
    marginBottom: "4%",
  },
  logG: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  logF: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

class AuthenticationChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuth: {},
      loaded: false,
    };
  }

  signInFB = async () => {
    // try {
    //   await Facebook.initializeAsync({
    //     appId: "870330067142413",
    //   });

    //   const {
    //     type,
    //     token,
    //     expirationDate,
    //     permissions,
    //     declinedPermissions,
    //   } = await Facebook.logInWithReadPermissionsAsync({
    //     permissions: ["public_profile", "email"],
    //   });
    //   if (type === "success") {
    //     fetch(
    //       https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)
    //     )
    //       .then((response) => response.json())
    //       .then((data) => {
    //         this.setState({
    //           userAuth: data,
    //           loaded: true,
    //         });
    //       })
    //       .catch((e) => console.log(e));
    //   } else {
    //     // type === 'cancel'
    //     console.log("FB login canceled");
    //   }
    // } catch (error) {
    //   console.log("FB login error : " + error);
    // }
  };
  signIn = async () => {
    // try {
    //   const result = await Google.logInAsync({
    //     androidClientId:
    //       "475962756761-ak6aqpd210bta53trn8htvqlc5d8tbec.apps.googleusercontent.com",
    //     scopes: ["profile", "email"],
    //   });
    //   if ((result.type = "success")) {
    //     console.log("Token : " + result.accessToken);
    //     this.setState({
    //       userAuth: result,
    //       loaded: true,
    //     });
    //   } else {
    //     console.log("Canceled");
    //   }
    // } catch (error) {
    //   console.log("Auth error : " + error);
    // }
  };
  content() {
   // if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <View style={styles.slider}></View>
          <View style={styles.footer}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "#f794e0",
              }}
            />
            <View style={styles.footerContent}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 24,
                  alignSelf: "center",
                  marginTop: "20%",
                }}
              >
                Enjoy your adventure
              </Text>
              {/* <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  alignSelf: "center",
                  marginTop: "2%",
                }}
              >
                Register
              </Text> */}

              <TouchableOpacity
                style={styles.button}
                // onPress={() => {
                //   this.props.navigation.navigate("AuthWithPhone");
                // }}
              >
                <Text style={styles.textBtn}>Login with PhoneNumber</Text>
              </TouchableOpacity>
              <SocialIcon
                title="Google"
                button
                type="google"
                style={styles.btnG}
               // onPress={this.signIn}
              />
              <SocialIcon
                title="Facebook"
                button
                type="facebook"
                style={styles.btnF}
               // onPress={this.signInFB}
              />

              <TouchableOpacity
                style={styles.newAccount}
              //  onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                    marginTop: "10%",
                  }}
                >
                  You already have an account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    // } else {
    //   return <AddUser navigation={this.props.navigation} />;
    // }
  }
  render() {
    return this.content();
  }
}

export default AuthenticationChoice;