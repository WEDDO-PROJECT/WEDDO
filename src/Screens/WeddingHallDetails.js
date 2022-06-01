import { Ionicons } from '@expo/vector-icons';
import react, { useState,useEffect ,useRef} from 'react';
import {View, SafeAreaView,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Avatar,Title,Caption,Text,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfileSPRoom from './EditProfileRoom.js';
import CardExemple from '../components/Card.js';
import StorageUtils from '../Utils/StorageUtils.js';

import MapView, { Marker, Region ,LatLng, Point} from "react-native-maps";
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get( 'window' );
const LATITUDE = 40.74333; // Korea Town, New York, NY 10001
const LONGITUDE = -73.99033; // Korea Town, New York, NY 10001
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
import { ScrollView } from 'react-native-gesture-handler';
const COLORS = {
    white: '#FFF',
    dark: '#000',
    primary: '#F9813A',
    secondary: '#fedac5',
    light: '#E5E5E5',
    grey: '#908e8c',
  };
const WeddingHallDetails = ({navigation,route})=>{
    const { weddinghalldata} = route.params;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cin, setCin] = useState("");
  const [document, setDocument] = useState("");
  const [tel, setTel] = useState("");
  const [category, setCategory] = useState("");
  const [weddinghall, setWeddinghall] = useState(null);
  let region = {
    longitude: 10.1785077,//myLocation.coords.longitude,
    latitude:36.8868947, //myLocation.coords.latitude,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  };
  const [myRegion, setRegion] = useState(undefined);
  const mapRef = useRef(null);
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
    setWeddinghall(weddinghalldata)
    console.log(weddinghalldata)
    let region = {
        longitude:Number(weddinghalldata.longitude) ,//myLocation.coords.longitude,
        latitude:Number(weddinghalldata.latitude), //myLocation.coords.latitude,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA
      };
      console.log(region)
      setRegion(region);
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

        <ScrollView>
          
        <View style={{flexDirection :'row' , marginTop : 30}}>
        
        <Title style={{marginLeft : '21%' ,fontSize:23, marginBottom:15,marginTop:15}}> Wedding Hall Details</Title>
         
        </View>
        <View style={styles.cartCard}>
            <View style={{flexDirection :'row'  ,justifyContent:'center'}}>
                <View style={{marginLeft:20 ,marginTop:10}}>
            
                    <Icon name='account-outline' size={35}>
                     <Title style={[styles.title,{ justifyContent:'center',size:30}]}>Name : {weddinghall?.name}</Title>
                     </Icon>
                </View>
            </View>
      
             <View style={{flexDirection :'row' ,justifyContent:'center',marginTop:5 }}>
                <Icon name='account-cash' size={35}></Icon>
                <Text style={{marginLeft:20 ,marginTop:10,size:30}}>
                    Price :  {weddinghall?.price}
                </Text>
             </View>
           
        </View>
        <View style={styles.cartCard }>
        
            <View style={{flexDirection :'row' ,marginTop:10,marginLeft:20}}>
            <Image
                   source={require("../assets/SP.png")}
                    style={styles.image}
                  />
              
              <View style={{flexDirection :'row'  ,justifyContent:'center'}}>
                    <Title style={[styles.title,{marginTop:15 ,marginBottom :5}]}> {name}</Title>
                    <Caption style={styles.caption}>{category}</Caption>
                </View>
                <Icon name='map-marker-radius'color='#777777' size={20}></Icon>
                <Text style={{color:"#777777",marginLeft:20}}>
                    Ariana , Tunis
                </Text>

                <Icon name='phone'color='#777777' size={20}></Icon>
                <Text style={{color:"#777777",marginLeft:40}}>
                    {tel}
                </Text>

                <Icon name='email'color='#777777' size={20}></Icon>
                <Text style={{color:"#777777",marginLeft:20}}>
                  {email}
                </Text>
                </View>
        </View>
       
    
            <View style={[styles.row ,{marginLeft :35}]}>
                
            </View>
        <View >
        
        <MapView 
            onRegionChange={() => mapRef.current.forceUpdate()}
            ref={mapRef}
            style={styles.map}
            
          initialRegion={myRegion}
            
        >

        { weddinghall &&
                    <Marker
                    coordinate={{
                        latitude: Number(weddinghall?.latitude),
                        longitude: Number(weddinghall?.longitude),
                    }}
                    ></Marker>
                }

        
            </MapView>
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
       </ScrollView>
    )
};
export default WeddingHallDetails;

const styles =StyleSheet.create({
    container:{
        flex :1
    },
    userInfoSection:{
         borderBottomColor :'#dddddd',
        borderBottomWidth:1,
        borderTopColor:'#dddddd',
        paddingHorizontal:30,
        marginBottom:25,
        
        
    },
    userInfoSection2:{
        borderBottomColor :'#dddddd',
       borderTopWidth:1,
       borderTopColor:'#dddddd',
       paddingHorizontal:0,
       marginBottom:25,
       
   },
    title:{
        fontSize:24,
        fontWeight :'bold',
    },
    caption :{
        fontSize :14,
        lineHeight:14,
        fontWeight:'bold',
    },
    row:{
        flexDirection:'row',
        marginBottom:0,
        justifyContent:'center',
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
      
    image: { height: 70, width: 70, borderRadius:60 },
    map: {
        marginTop:10,
        height: 300, width: '100%',
        left: 0,
        right: 0,
        bottom: 10,
      },
      cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
      },
})