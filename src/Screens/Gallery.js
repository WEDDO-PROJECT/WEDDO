import { Ionicons } from '@expo/vector-icons';
import React, { useState,useEffect ,useRef} from 'react';
import {View, SafeAreaView,StyleSheet,Image,TouchableOpacity,Button, Alert} from 'react-native';
import {Avatar,Title,Caption,Text,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StorageUtils from '../Utils/StorageUtils.js';

import Stars from "react-native-stars";
import * as Permissions from 'expo-permissions';
import Gallery from 'react-native-image-gallery';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get( 'window' );
import { ScrollView, TextInput } from 'react-native-gesture-handler';

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
const SPGallery = ({navigation})=>{
  
  const [images, setImages] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [nom, setNom] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [tel, setTel] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [rating, setRating] = React.useState(null);
  const [isClient, setIsClient] = useState(null);
  const [date, setDate] = useState(null);
  
  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const updaterating = (val)=> {

    let obj={
      user_id:109,
      sp_id:id,
      rating:val
    }
    
    axios.post(`${BasePath}/api/sp/rating/create`,obj)
    .then(res=>{
      console.log(res.data);
    })

  }

  useEffect(() => {
    async function getUser() {
      let data
      await StorageUtils.retrieveData('weddingHall').then((value) => {
        StorageUtils.retrieveData('date').then(res=> {
          setDate(res)
        })
        data = JSON.parse(value)

        setId(data.id)
        const body ={
          id:id
        }

        setPrice(data.pack_price)
        setNom(data.owner_name)
        setCategory(data.category)
        setEmail(data.email)
        setTel(data.tel)
        setRating(Math.floor(Math.random() * 6) + 1)

        StorageUtils.retrieveData('userRole').then((value) => {
          data = JSON.parse(value)
          setIsClient(data === 'client')
        })

        axios 
        .get(BasePath + "/api/sp/getimages/"+data.id)
        .then((response)=>{

          let data = response.data.result

          for(let i = 0 ; i< data.length ; i++){
              
            let s = {
              source: { uri:data[i].image}
            }
            setImages(images => [...images, s]);
          }


        })
        .catch((error)=>{
          console.log(error)
        })
    
        });
      
    }
    getUser();
  }, []);
   
    const pickImage = async () => {
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
            bs.current.snapTo(1)
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
              sp_id: id
            }

            let s = {
                source: { uri:data.secure_url}
              }
              setImages(images => [...images, s]);

            axios 
              .post(BasePath + "/api/sp/AddImage",body)
              .then((response)=>{
                console.log(response)
                
              })
              .catch((error)=>{
                console.log(error)
              })
          }).catch(err => {
            console.log(err)
            Alert.alert("An Error Occured While Uploading")
          })
        
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

    const updatePrice = ()=>{

        const body = {
            id : id , 
            pack_price : price 
        }
        console.log(body)

        
    axios.post(BasePath + "/api/sp/updateprice",body).then((response)=>{
      console.log(response.data)
      
    }).catch((error)=>{
      console.log(error)
    })



    }


    const addRequest = ()=> {
      StorageUtils.retrieveData('user').then(user => {
        console.log(user)
        let obj={
          user_id:JSON.parse(user).id,
          sp_id:id,
          date:date
        }
        console.log("obj here "+obj)
        axios.post(`${BasePath}/api/sp/request/create`,obj)
        .then(res=>console.log(res))
    })

      // let obj={
      //   user_id:113,
      //   sp_id:id,
      //   date:"07/06/2022"
      // }
      // axios.post(`${BasePath}/api/sp/request/create`,obj)
      // .then(res=>console.log(res))
    }

        return(
            <ScrollView >
                
                <View style={{flex :1,height : height}}>
                
                <View style={{flexDirection :'row' , marginTop : 60 , alignSelf : 'center'}}>

                 
                
                {!isClient ? 
                          <View style={{flexDirection :'column' ,justifyContent:'center', }}>
                              <Title style={{fontSize:23,fontWeight:"bold", marginBottom:15,color:'#d49b35'}}>
                                  My Space
                              </Title>
                              <TextInput
                              value={price}
                              onChangeText={(e)=>setPrice(e)}
                              placeholder="Price"
                              keyboardType='numeric'
                              textAlign={'center'} 
                              style={{ flex: 0, paddingVertical: 0 , alignItems: 'center', }}
                              />
                              <TouchableOpacity style={styles.commandButton} onPress={updatePrice}>
                                <Text style={styles.panelButtonTitle}>update</Text>
                              </TouchableOpacity>
                              
                              
                          </View>
                 : 

                    <View style={styles.cartCard }>
                      
                    <Title style={{fontSize:23,fontWeight:"bold", color:'#FDC12A'}}>
                                                        Service Provider Details
                    </Title>
                    <View style={{flexDirection :'row',alignItems:'center' ,marginLeft:20}}> 
                    <Image
                          source={require("../assets/SP.png")}
                          style={styles.image}
                        />

                      
                    
                    <View style={{flexDirection :'column' ,alignContent:'center' , marginLeft : 30}}>
                        
                          <Title style={[styles.title,{marginBottom :5}]}> {nom}</Title>
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

                      <View style={{marginBottom :5}}></View>
                      <Icon name='account-cash'color='#000000' size={20}>
                      <Text style={{fontSize :18,color:"#000000" ,fontWeight : 'bold',marginLeft:20}}>
                        {price}
                      </Text> 
                      </Icon>
                      
                    </View>
                    </View> 


                    </View>
              }
                
                
              
            
            </View>
                <Gallery
                    style={{  backgroundColor: 'white'}}
                    images={images}
                />
            <View>

                    {!isClient ? 
                    
                    <TouchableOpacity style={styles.commandButton} onPress={() => {bs.current.snapTo(0)}}>
                                <Text style={styles.panelButtonTitle}>Add Images</Text>
                            </TouchableOpacity>
                    : 
                    
                    <View>

                    <TouchableOpacity style={styles.commandButton} onPress={() => {addRequest}}>
                    <Stars
              // half={true}
              default={4}
              update={(val) => {
                // this.setState({starts:val});
                updaterating(val)
                console.log(val);
                // this.rating(val)
              }}
              spacing={4}
              count={5}
              fullStar={
                <Icon name={"star"} size={40} style={[styles.myStarStyle]} />
              }
              emptyStar={
                <Icon
                  name={"star-outline"}
                  size={40}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon
                  name={"star-half"}
                  size={40}
                  style={[styles.myStarStyle]}
                />
              }
            />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commandButton} onPress={addRequest}>
                            <Text style={styles.panelButtonTitle}>Request for {date}</Text>
                    </TouchableOpacity>



                    </View>
                    
                    }
                    
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
                </View>
            </ScrollView>
           
        )

}


export default SPGallery;
const styles =StyleSheet.create({
    container:{
        flex :1
    },
    mapButton: {
        marginTop : 10,
        flexDirection :'row',
        backgroundColor: '#FF6347',
        alignItems: 'center',
        
      },
    image: { height: 70, width: 70, borderRadius:60 },
      commandButton: {
        marginTop : 10,
        marginBottom :10,
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#d49b35',
        alignItems: 'center',
      },
      UPDATEButton: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
      },
      myStarStyle: {
        color: "grey",
        backgroundColor: "transparent",
        textShadowColor: "black",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
      },
      myEmptyStarStyle: {
        color: "white",
      },
      cartCard1: {
        height: 150,
        backgroundColor: COLORS.white,
        width : width*0.92,
        alignItems: 'center',
        marginVertical:5,
        borderRadius: 10,
        marginHorizontal: 15,
        paddingHorizontal: 10,
        
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
        backgroundColor: '#d49b35',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
      mapButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
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
      cartCard: {
        height: 250,
        width:'94%',
        elevation: 5,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 12,
        paddingHorizontal: 50,
        paddingBottom :20,
        marginHorizontal: 12,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
      },

      
})