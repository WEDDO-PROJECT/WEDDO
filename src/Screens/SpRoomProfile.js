import { Ionicons } from '@expo/vector-icons';
import react from 'react';
import {View, SafeAreaView,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Avatar,Title,Caption,Text,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfileSPRoom from './EditProfileRoom.js';
// import CardExemple from '../components/Card.js';
const ProfileRoom = ({navigation})=>{
  
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
            <Title style={{marginLeft : '50%'}}>profile</Title>
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
                <Avatar.Image 
                source={
                    {
                        uri:'../assets/SP.png'
                    }
                    
                }
                size={80}
                />
                <View style={{marginLeft:20}}>
                    <Title style={[styles.title,{marginTop:15 ,marginBottom :5}]}> Fradj Mili</Title>
                    <Caption style={styles.caption}>fradj@gmail.com</Caption>
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
                    55004732
                </Text>
            </View>
            <View style={styles.row}>
                <Icon name='email'color='#777777' size={20}></Icon>
                <Text style={{color:"#777777",marginLeft:20}}>
                   Fradj.mili@esprit.tn
                </Text>
            </View>
        </View>
        <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
                <Title>1000dt</Title>
                <Caption>Prix</Caption>
            </View>
            <View style={styles.infoBox}>
                <Title>1000</Title>
                <Caption>Prix</Caption>
            </View>

            
        </View>
       
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

      }
})