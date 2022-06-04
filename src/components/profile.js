// import React, { Component } from 'react';
// import axios from 'axios';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity
// } from 'react-native';
// import { AsyncStorage } from 'react-native';
// export default class Profile extends Component {
//   constructor(props){
//     super(props)
//     this.state={
//       user:[]
//     }
//    }
//   componentDidMount(){
//     this.getUserInfo()
//     // console.log(this.state.user)
//   }
//    getUserInfo():{
//     AsyncStorage.getItem("response").then((res)=>{
//    var x = JSON.parse(res)
//    console.log("Hamady " , x.id)
//    axios.get(`http://192.168.107.70:3000/api/sp/getSpInfo/${x.id}`).then(({data})=>{

//      console.log('fffff',data[0])
//      setUserData(data[0])
//      console.log(userData,'hamid')
//    }).catch((err)=>{
//      console.log(err)
//    })
//    })    
//  }
//   render() {
    
//     return (
//       <View style={styles.container}>
//           <View style={styles.header}></View>
//           <Image style={styles.avatar} source={{uri: 'https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/274980301_1121643038596445_1815628856691352671_n.jpg?stp=dst-jpg_p75x225&_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_ohc=R7nLcS-Z4M8AX9_pi5g&_nc_ht=scontent.ftun4-2.fna&oh=03_AVJYC3VcXrUaAsKgqgyM9FlW16rO8CHYrnvqNaXGxHR6hw&oe=62BB5233'}}/>
//           <View style={styles.body}>
//             <View style={styles.bodyContent}>
//               <Text style={styles.name}>{this.state.user.professional_name}</Text>
//               <Text style={styles.info}>{this.state.user.category}</Text>
//               <Text style={styles.description}>{this.state.user.description}</Text>
//               <Text style={styles.description}>{this.state.user.tel}</Text>
//               <TouchableOpacity style={styles.buttonContainer}>
//                 <Text>Contact Me</Text>  
//               </TouchableOpacity>              
//               <TouchableOpacity style={styles.buttonContainer}>
//                 <Text >Posts</Text>  
//               </TouchableOpacity> 
//             </View>
//         </View>
//       </View>
//     );
//   };
// };
// const styles = StyleSheet.create({
//   header:{
//     backgroundColor: "#B22222",
//     height:200,
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: "white",
//     marginBottom:10,
//     alignSelf:'center',
//     position: 'absolute',
//     marginTop:130
//   },
//   name:{
//     fontSize:22,
//     color:"#FFFFFF",
//     fontWeight:'600',
//   },
//   body:{
//     marginTop:40,
//   },
//   bodyContent: {
//     flex: 1,
//     alignItems: 'center',
//     padding:30,
//   },
//   name:{
//     fontSize:28,
//     color: "#696969",
//     fontWeight: "600"
//   },
//   info:{
//     fontSize:16,
//     color: "#F0C5DA",
//     marginTop:10
//   },
//   description:{
//     fontSize:16,
//     color: "#696969",
//     marginTop:10,
//     textAlign: 'center'
//   },
//   buttonContainer: {
//     marginTop:10,
//     height:45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom:20,
//     width:250,
//     borderRadius:30,
//     backgroundColor: "#B22222",
//   },
// })