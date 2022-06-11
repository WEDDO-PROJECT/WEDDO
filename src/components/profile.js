import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BasePath from "../constants/BasePath";
import Stars from "react-native-stars";
import Gallery from 'react-native-image-gallery';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      user:[],
      profile:[],
      date:'',
      starts:null,
      images:[]
    }
   }
  componentDidMount(){
    AsyncStorage.getItem('startDate').
    then(res=>this.setState({date:res}))
    this.getProfileInfo()
    this.getUserInfo()
    // AsyncStorage.getItem('startDate').
    // then((res=>this.setState({data:res})))
    // console.log(this.state.user)
  }
  
  getUserInfo() {
    AsyncStorage.getItem('user').
    then(res=>{var x=JSON.parse(res)
      console.log(x);
      this.setState({user:x})
    }
    )
  }
  async getProfileInfo(){
    await AsyncStorage.getItem("response").then((res)=>{
    var x = JSON.parse(res)
    console.log("Hamady " , x.id)
    // axios.get(`${BasePath}/api/sp/info/${x.id}`).then(({data})=>{
    //   console.log('fffff',data)
      this.setState({
        profile:x
      })
      console.log(this.state.profile)
      console.log(this.state.user)
      console.log(this.state.date)
      axios 
          .get(BasePath + "/api/sp/getimages/"+x.id)
          .then((response)=>{
var array=[]
            console.log(response.data.result);
            for(let i = 0 ; i< response.data.result.length ; i++){
              let s = {
                 uri:response.data.result[i].image
              }
             array.push(s)
            //  this.setState({images : [...this.state.images, s]});
            }
            this.setState({images:array})

          })
          .catch((error)=>{
            console.log(error) 
          })
    }).catch((err)=>{
      console.log(err)
    // })
    
    
    })
    
  }
  rating(x){
let obj={
  user_id:this.state.user.id,
  sp_id:this.state.profile.id,
  rating:x
}
axios.post(`${BasePath}/api/rating/create`,obj)
.then(res=>{
  console.log(res.data);
})
  }
  send(){
    console.log('yes');
    console.log(this.state.profile,'but');
    console.log(this.state.user,'but');
    console.log(this.state.date,'but');
    var obj={
      user_id:this.state.user.id,
      sp_id:this.state.profile.id,
      date:this.state.date
    }
    axios.post(`${BasePath}/api/request/create`,obj)
    .then(res=>console.log('yes'))
  }
  render() {
    console.log('images',this.state.images)
    return (
      <ScrollView>
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri:this.state.profile.logo}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text >the dreamer</Text>
              <Text style={styles.category}>photographer</Text>
              <Text style={styles.description}>photographe professionnel</Text>
              <Text>25639789</Text>
              {/* <Text style={styles.tel} >{this.state.date}</Text>  */}
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Contact Me</Text>  
              </TouchableOpacity>              
              <View style={styles.buttonContainer}>
              <Stars
              // half={true}
              default={this.state.profile.rating}
              update={(val) => {
                this.setState({starts:val});
                console.log(val);

                this.rating(val)
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
              {/* <Gallery
              style={{ flex: 1, height: 270 }}
              images={this.state.images}
            /> */}
              </View>
              <TouchableOpacity style={styles.buttonContainer}
              onPress={() =>this.send()}>
                <Text >{this.state.date}</Text>  
              </TouchableOpacity> 
                {this.state.images.length >0&&this.state.images.map((elem,i)=>(<Image key={i} style={{borderWidth:2,borderColor:'black',width:250,height:250}} source={{uri: elem.uri}} />))} 
        {/* {this.state.images.map((elem,i)=>(<Image key={i} source={elem}/>)
        )} */}
            </View>
        </View>
      </View>
      </ScrollView>
    );
  };
};
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#D49B35",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#F0C5DA",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#D49B35",
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
})