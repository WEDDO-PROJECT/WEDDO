import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import axios from 'axios';


// function Photos({ photos }) {
//   const imgWidth = Dimensions.get('screen').width * 0.3;
//   return (
//     <View style={{}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//           alignItems: 'flex-start',
         
//         }}
//       >
//         {photos.map((photo, index) => (
//           <View>
//             <Image
//               style={{ width: 180, height: 140}}
//               source={require("../assets/W1.jpg")}
//             />
//                <Image
//               style={{ width: 180, height: 150  }}
//               source={{
//                 uri: 'https://karenwillisholmes.com/wp-content/uploads/2021/01/Caroline-Simple-V-neck-Wedding-Dress-Karen-Willis-Holmes-Noel-Rob-@cararobbinsstudio23-1200x1797.jpg',
//               }}
//             />
//               <Image
//               style={{ width: 180, height: 150 }}
//               source={{
//                 uri: 'https://the-springs.com.au/wp-content/uploads/2016/12/Amy-Max-732-1.jpg',
//               }}
//             />
//             <Image
//               style={{ width: 180, height: 150 }}
//               source={{
//                 uri: 'https://www.riu.com/en/weddings/img/DUN_2.jpg',
//               }}
//             />
//             <Image
//               style={{ width: 180, height: 150 }}
//               source={{
//                 uri: 'https://www.phillymag.com/wp-content/uploads/sites/3/2021/10/main-3.jpg',
//               }}
//             />
//              <Image
//               style={{ width: 170, height: 150 }}
//               source={{
//                 uri: 'https://images.squarespace-cdn.com/content/v1/5491d3cce4b0a85d8c259038/1587085892219-WEO3Q775GTCI8CF9VEQ6/august-south-congress-hotel-wedding.jpg',
//               }}
//             />
//              <Image
//               style={{ width: 190, height: 150 }}
//               source={{
//                 uri: 'https://www.honeydewmoments.co.uk/wp-content/uploads/2020/10/Holbrow-Micro-Wedding-10.10.20-253-1-scaled.jpg',
//               }}
//             />
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// }

export default function Profile() {


  const [showContent, setShowContent] = useState('Photos');
const [userData,setUserData]=useState([])
useEffect(()=>{
  
    getUserInfo()
  
    
},[])
const getUserInfo=()=>{
    AsyncStorage.getItem("response").then((res)=>{
   var x = JSON.parse(res)
   console.log("Hamady " , x.id)
   axios.get(`http://192.168.107.70:3000/api/sp/getSpInfo/${x.id}`).then(({data})=>{

     console.log('fffff',data[0])
     setUserData(data[0])
     console.log(userData,'hamid')
   }).catch((err)=>{
     console.log(err)
   })
   })    
 }

  return (
    <View style={{ flex: 2}}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <>
          <View>
            <Image
              style={styles.coverImage}
              source={{ uri: 'https://us.123rf.com/450wm/trimailova/trimailova1712/trimailova171200036/92055955-d%C3%A9tails-de-fond-de-texture-dor%C3%A9e-avec-d%C3%A9grad%C3%A9-et-ombre-mur-de-peinture-de-couleur-or-fond-de-luxe-do.jpg?ver=6' }}
            />
          </View>
          <View style={styles.profileContainer}>
            <View>
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: 'https://video.fnbe1-2.fna.fbcdn.net/v/t1.15752-9/274980301_1121643038596445_1815628856691352671_n.jpg?stp=dst-jpg_p75x225&_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_ohc=Z_B7dKTtDE0AX860wCD&_nc_ad=z-m&_nc_cid=0&_nc_ht=video.fnbe1-2.fna&oh=03_AVJMSJyFl4V8tQqx16k0S8WdfLw4FR21ayOoCug0uLY_mQ&oe=62BF46B3',
                  }}
                />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{userData.professional_name}</Text>
                <Text style={styles.userBio}>{userData.description}</Text>
                <Text style={styles.userBio}>{userData.tel}</Text>
                
              </View>
            </View>
            {/* Profile Content */}
            <View style={{ marginTop: 30 }}>
              <View style={styles.profileContentButtonsView}>
              <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === 'Photos' ? 5 : 0,
                  }}
                  onPress={() => setShowContent('Photos')}
                >
                  <Text style={styles.showContentButtonText}>PHOTOS</Text>
                </TouchableOpacity>
              </View>
              {/* {showContent === 'Photos' ? (
                <Photos photos={new Array(13).fill(2)} />
              )  : (
                <Tags photos={new Array(23).fill(2)} />
              )} */}
            </View>
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 300, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontFamily: 'SSBold', fontSize: 26 },
  userBio: {
    fontFamily: 'SSRegular',
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 2, alignItems: 'center' },
  countNum: { fontFamily: 'SSBold', fontSize: 20 },
  countText: { fontFamily: 'SSRegular', fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  

  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {
    fontFamily: 'SSRegular',
    fontSize: 18,
  },
});