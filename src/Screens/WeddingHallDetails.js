import { Ionicons } from '@expo/vector-icons';
import React, { useState,useEffect ,useRef} from 'react';
import {View, SafeAreaView,StyleSheet,Image,TouchableOpacity,Button, Alert} from 'react-native';
import {Avatar,Title,Caption,Text,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfileSPRoom from './EditProfileRoom.js';
// import CardExemple from '../components/Card.js';
import StorageUtils from '../Utils/StorageUtils.js';

import * as Permissions from 'expo-permissions';
import Modal from "react-native-modal";
import Gallery from 'react-native-image-gallery';
import MapView, { Marker, Region ,LatLng, Point} from "react-native-maps";
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get( 'window' );
const LATITUDE = 40.74333; // Korea Town, New York, NY 10001
const LONGITUDE = -73.99033; // Korea Town, New York, NY 10001
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
import { ScrollView } from 'react-native-gesture-handler';

import BasePath from "../constants/BasePath";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
 import axios from 'axios'
 
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'react-native-image-picker';
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
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [images, setImages] = React.useState([]);
  let region = {
    longitude: 10.1785077,//myLocation.coords.longitude,
    latitude:36.8868947, //myLocation.coords.latitude,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  };
  const [myRegion, setRegion] = useState(undefined);
  const mapRef = useRef(null);
  
  const bs = React.createRef();
 const fall = new Animated.Value(1);
  useEffect(() => {
    async function getUser() {
      let data
      await StorageUtils.retrieveData('user').then((value) => (data = JSON.parse(value)));
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

      
      const body ={
        id: 156
      }
     
          axios 
              .get(BasePath + "/api/sp/getimages/"+body.id)
              .then((response)=>{
                console.log('HELLO '+ response.data.result)

                let data = [] 
                for(let i = 0 ; i< response.data.result.length ; i++){
                  let s = {
                    source: { uri:response.data.result[i].image}
                  }
                  data.push(s)
                }

                console.log(data)
                setImages(data)




                // const data =response.data.result[0]
                // navigation.navigate("WeddingHallDetails",{weddinghalldata : data})
                // console.log(data)
              })
              .catch((error)=>{
                console.log(error)
              })
    }

    
        setWeddinghall(weddinghalldata)
        let region = {
            longitude:Number(weddinghalldata.longitude) ,//myLocation.coords.longitude,
            latitude:Number(weddinghalldata.latitude), //myLocation.coords.latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          };
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
      const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          console.log(image);
          setImage(image.path);
          bs.current.snapTo(1);
        });
      }
      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        
    
        if (!result.cancelled) {
            const uri = result.uri;
            const type = result.type;
            const name = 'aaaa';
            const source = {
              uri,
              type,
              name,
            }
            cloudinaryUpload(source)
            let s = {
              source: { uri:uri}
            }

            setImages(images => [...images, s]);
            bs.current.snapTo(1)
           // console.log(source)
          }
        
      };
      const cloudinaryUpload = async (result) => {
      
        const data = new FormData()
        data.append('file', {  type:'image/jpeg', uri : result.uri , name:'file.jpeg'})
        data.append('upload_preset', 'expopreset')
        data.append("cloud_name", "pentagon")
        fetch("https://api.cloudinary.com/v1_1/pentagon/upload", {
          method: "post",
          body: data
        }).then(res => res.json()).
          then(data => {
            console.log(data)

            const body ={
              image: data.secure_url,
              sp_id: weddinghall.id
            }

            axios 
              .post(BasePath + "/api/sp/AddImage",body)
              .then((response)=>{
                console.log(response)
                // const data =response.data.result[0]
                // navigation.navigate("WeddingHallDetails",{weddinghalldata : data})
                // console.log(data)
              })
              .catch((error)=>{
                console.log(error)
              })
            //setPhoto(data.s ecure_url)
          }).catch(err => {
            console.log(err)
            Alert.alert("An Error Occured While Uploading")
          })
      
      
      
      
        //   console.log(result.base64)
      //   let base64Img = result.uri
      
      // //Add your cloud name
      // let apiUrl = 'https://api.cloudinary.com/v1_1/pentagon/image/upload';
  
      // const body = {
      //   uri: result.uri,
      //   name: 'SomeImageName.jpg',
      //   type: 'image/jpg',
      // }

      //   const data = new FormData();
      //   data.append("image", body);
    
      //   await fetch(BasePath + "/api/sp/AddImage", {
      //     method: "POST",
      //     body: data,
      //   }).then( r => {
      //           let data =  r.json()
      //           console.log(data)
      //           return data.secure_url
      //     }).catch(err=>console.log(err))
        


      // axios 
      //   .post(BasePath + "/api/sp/AddImage",body)
      //   .then((response)=>{
      //     console.log(response)
      //     // const data =response.data.result[0]
      //     // navigation.navigate("WeddingHallDetails",{weddinghalldata : data})
      //     // console.log(data)
      //   })
      //   .catch((error)=>{
      //     console.log(error)
      //   })

    //   let data = {
    //     "file": base64Img,
    //     "upload_preset": "expopreset",
    //   }

    //   fetch(apiUrl, {
    //     body: JSON.stringify(data),
    //     headers: {
    //       'content-type': 'application/json'
    //     },
    //     method: 'POST',
    //   }).then(async r => {
    //       let data = await r.json()
    //       console.log(data.secure_url)
    //       return data.secure_url
    // }).catch(err=>console.log(err))
       
       
       
       
       
       
        // const data = new FormData()
        // data.append('file', photo)
        // data.append('upload_preset', 'pentagon')
        // data.append("cloud_name", "pentagon")
        // fetch("https://api.cloudinary.com/v1_1/pentagon/upload", {
        //   method: "post",
        //   body: data
        // }).then(res => res.json()).
        //   then(data => {
        //     setImage(data.secure_url)
    
        //   }).catch(err => {
        //       console.log(err)
        //     Alert.alert("An Error Occured While Uploading")
        //   })
      }
      const pickFromCamera = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
             let data =  await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
            if(!data.cancelled){
              const uri = data.uri;
              const type = data.type;
              const name = 'aaaa';
              const source = {
                uri,
                type,
                name,
              }
              let s = {
                source: { uri:uri}
              }
              setImages(images => [...images, s]);
              cloudinaryUpload(data)
              bs.current.snapTo(1)
            }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }
  
         const  renderInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
          </View>
          <TouchableOpacity style={styles.panelButton} onPress={pickFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bs.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );

      
 const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    return(

        <ScrollView>
          
        <View style={{flexDirection :'row' , marginTop : 60}}>
        
        <Title style={{marginLeft : '21%' ,fontSize:23, marginBottom:15,marginTop:15,color:'#FDC12A'}}> Wedding Hall Details</Title>
         
        </View>
        <View style={styles.cartCard1}>
            <View style={{flexDirection :'row'  ,justifyContent:'center'}}>
                <View style={{marginLeft:20 ,marginTop:10}}>
                     <Title style={[styles.title,{ justifyContent:'center',size:30}]}>{weddinghall?.name}</Title>
                </View>
            </View>
      
             <View style={{flexDirection :'row' ,justifyContent:'center',marginTop:15 }}>
                <Icon name='account-cash' size={25}></Icon>
                <Text style={{marginLeft:5 ,fontSize:18}}>
                    {weddinghall?.price}
                </Text>
             </View>
             <View style={{flexDirection :'row' ,justifyContent:'center',marginTop:15 }}>
                
                <TouchableOpacity style={styles.mapButton} onPress={toggleModal}>
                <Icon name='map-marker-radius-outline' size={30}></Icon>
                  <Text style={styles.mapButtonTitle}>Show Location</Text>
                </TouchableOpacity>
                
             </View>
             
        </View>
        <View style={styles.cartCard }>
        
             <View style={{flexDirection :'row',alignItems:'center' ,marginLeft:20}}> 
            <Image
                   source={require("../assets/SP.png")}
                    style={styles.image}
                  />
            
                
              
              <View style={{flexDirection :'column' ,alignContent:'center' , marginLeft : 30}}>
                  
                    <Title style={[styles.title,{marginBottom :5}]}> {name}</Title>
                    <View style={{marginBottom :5}}></View>
                    <Caption style={styles.caption}>{category}</Caption>
                
                
                <View style={{marginBottom :5}}></View>
                <Icon name='phone'color='#777777' size={20}>
                <Text style={{fontSize :16,color:"#777777" ,marginBottom :5}}>
                    {tel}
                </Text>
                </Icon>
               
                <View style={{marginBottom :5}}></View>
                <Icon name='email'color='#777777' size={20}>
                <Text style={{fontSize :16,color:"#777777" ,marginRight:20}}>
                  {email}
                </Text> 
                </Icon>
                
            </View>
            </View> 

        
        </View>
       
    
            <View style={[styles.row ,{marginLeft :35}]}>
                
            </View>

            <View>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
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
          <Button title="Hide" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
        <Gallery
        style={{ flex: 1, height: 270 }}
        images={images}
      />
        <View>
        <TouchableOpacity style={styles.commandButton} onPress={() => {bs.current.snapTo(0)}}>
          <Text style={styles.panelButtonTitle}>Add Images</Text>
        </TouchableOpacity>
        <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />

      

        </View>
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
        height: 200,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 12,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
      },
      cartCard1: {
        height: 180,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        
      },
    
      commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
        marginBottom:10,
      },
      mapButton: {
        marginTop : 10,
        flexDirection :'row',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        
      },
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      mapButtonTitle: {
        marginLeft : 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FF6347',
      },
      action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
      },
      actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
      },
      textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
      },

      
})