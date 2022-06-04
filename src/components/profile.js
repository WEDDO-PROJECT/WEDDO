import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BasePath from "../constants/BasePath";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      user:[],
      profile:[],
      date:''
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
    axios.get(`${BasePath}/api/sp/info/${x.id}`).then(({data})=>{
      console.log('fffff',data)
      this.setState({
        profile:data[0]
      })
      console.log(this.state.profile)
      console.log(this.state.user)
      console.log(this.state.date)
    }).catch((err)=>{
      console.log(err)
    })
    
    
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
    console.log(this.state.data)
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri:'https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/274980301_1121643038596445_1815628856691352671_n.jpg?stp=dst-jpg_p75x225&_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_ohc=R7nLcS-Z4M8AX9_pi5g&_nc_ht=scontent.ftun4-2.fna&oh=03_AVJYC3VcXrUaAsKgqgyM9FlW16rO8CHYrnvqNaXGxHR6hw&oe=62BB5233'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.professional_name}>{this.state.profile.professional_name}</Text>
              <Text style={styles.category}>{this.state.profile.category}</Text>
              <Text style={styles.description}>{this.state.profile.description}</Text>
              <Text >{this.state.profile.tel}</Text>
              {/* <Text style={styles.tel} >{this.state.date}</Text>  */}
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Contact Me</Text>  
              </TouchableOpacity>              
              <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() =>this.rating(1)}>
                <Text style={{marginRight:10}} >1</Text>  
              </TouchableOpacity> 
              <TouchableOpacity onPress={() =>this.rating(2)}>
                <Text style={{marginRight:10}}>2</Text>  
              </TouchableOpacity> 
              <TouchableOpacity onPress={() =>this.rating(3)}>
                <Text style={{marginRight:10}} >3</Text>  
              </TouchableOpacity> 
              <TouchableOpacity onPress={() =>this.rating(4)}>
                <Text style={{marginRight:10}}>4</Text>  
              </TouchableOpacity> 
              <TouchableOpacity onPress={() =>this.rating(5)}>
                <Text style={{marginRight:10}} >5</Text>  
              </TouchableOpacity> 
              </View>
              <TouchableOpacity style={styles.buttonContainer}
              onPress={() =>this.send()}>
                <Text >{this.state.date}</Text>  
              </TouchableOpacity> 
            </View>
        </View>
      </View>
    );
  };
};
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#B22222",
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
    backgroundColor: "#B22222",
  },
})