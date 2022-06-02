import { Ionicons } from '@expo/vector-icons';
import react, { useState,useEffect } from 'react';
import {View, SafeAreaView,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Avatar,Title,Caption,Text,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfileSPRoom from './EditProfileRoom.js';
// import CardExemple from '../components/Card.js';
import StorageUtils from '../Utils/StorageUtils.js';
const ProfileRoom = ({navigation})=>{
    
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cin, setCin] = useState("");
  const [document, setDocument] = useState("");
  const [tel, setTel] = useState("");
  const [category, setCategory] = useState("");
  
 
  useEffect(() => {
    async function getUser() {
      let data
      await StorageUtils.retrieveData('user').then((value) => (data = JSON.parse(value)));
     console.log(data);
      if (data === undefined) {
       console.log('not found')
      } else {

          setName(data.owner_name)
         // console.log(data.'owner_name')
          setEmail(data.email)
        //  console.log(data.email)
          setCategory(data.category)
          setCin(data.cin)
          setTel(data.tel)
      }
    }
    getUser();
  }, []);
    function goBack() {
        console.log('bhvfjnfnvfvn')
        navigation.toggleDrawer();
      }

      function edit () {
          navigation.navigate('EditProfileSPRoom')
      }
    return(
    <SafeAreaView style={styles.container}>

        <View style={{flexDirection :'row' , marginTop : 25}}>
        <TouchableOpacity onPress={goBack} style={styles.roundButtonActive}>
         
         <Ionicons
               name="menu-outline"
               size={30}
               color="#666"
               style={{ marginRight: 5 }}
             />
         </TouchableOpacity>
            <Title style={{marginLeft : '42%' ,fontSize:23}}>Profile</Title>
         <TouchableOpacity onPress={edit} style={styles.roundIconEdit}>
         <Ionicons
               name="md-person-sharp"
               size={30}
               color="#666"
             />
         
         </TouchableOpacity>
                    
        </View>
       

        <View style={styles.userInfoSection}>
        
            <View style={{flexDirection :'row' ,marginTop:50}}>
            <Image
                   source={require("../assets/SP.png")}
                    style={styles.image}
                  />
              
                <View style={{marginLeft:20}}>
                    <Title style={[styles.title,{marginTop:15 ,marginBottom :5}]}> {name}</Title>
                    <Caption style={styles.caption}>{category}</Caption>
                </View>
                </View>
        </View>
        <View style={styles.userInfoSection}>
            <View style={styles.row}>
                <Icon name='map-marker-radius'color='#777777' size={20}></Icon>
                <Text style={{color:"#777777",marginLeft:20}}>
                    Ariana , Tunis
                </Text>
            </View>
            <View style={styles.row}>
                <Icon name='phone'color='#777777' size={20}></Icon>
                <Text style={{color:"#777777",marginLeft:20}}>
                    {tel}
                </Text>
            </View>
            <View style={styles.row}>
                <Icon name='email'color='#777777' size={20}></Icon>
                <Text style={{color:"#777777",marginLeft:20}}>
                  {email}
                </Text>
            </View>
        </View>
        {/* <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
                <Title>1000dt</Title>
                <Caption>Prix</Caption>
            </View>
            <View style={styles.infoBox}>
                <Title>1000</Title>
                <Caption>Prix</Caption>
            </View>

            
        </View> */}
       
    </SafeAreaView>
    )
};
export default ProfileRoom;

const styles =StyleSheet.create({
    container:{
        flex :1
    },
    userInfoSection:{
        paddingHorizontal:30,
        marginBottom:25,
        
    },
    title:{
        fontSize:24,
        fontWeight :'bold',
    },
    caption :{
        fontSize :14,
        lineHeight:14,
        fontWeight:'500',
    },
    row:{
        flexDirection:'row',
        marginBottom:10,
    },
    infoBoxWrapper :{
        borderBottomColor :'#dddddd',
        borderBottomWidth:1,
        borderTopColor:'#dddddd',
        borderTopWidth:1,
        flexDirection:'row',
        height:100,
    },
    infoBox:{
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
    },
    menuWrapper :{
        marginTop:10,
    },
    menuItem :{
        flexDirection:'row',
        paddingVertical:15,
        paddingHorizontal:30,
    },
    menuItemText:{
        color:'#777777',
        marginLeft:20,
        fontWeight:'600',
        fontSize:16,
        lineHeight:26,
    },
    roundButtonActive: {
        height: 50,
        width:50,
        position:'absolute',
      },
      roundIconEdit:{
        height :50,
        width:50,
        marginLeft:'90%',
        position:'absolute',

      },
      
    image: { height: 90, width: 90, borderRadius:60 },
})