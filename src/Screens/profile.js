// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Dimensions,
// } from 'react-native';

// import { Feather as Icon } from '@expo/vector-icons';


// import { useFonts } from 'expo-font';


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

// function Albums() {
//   const [albums] = useState([
  
//     {
//       name: 'weddings',
//       images: [
//         'https://karenwillisholmes.com/wp-content/uploads/2021/01/Caroline-Simple-V-neck-Wedding-Dress-Karen-Willis-Holmes-Noel-Rob-@cararobbinsstudio23-1200x1797.jpg',
//         'https://www.seclusions.com.au/imagesDB/gallery/Freeman0674_websize.jpg',
//         'https://the-springs.com.au/wp-content/uploads/2016/12/Amy-Max-732-1.jpg',
//         'https://www.riu.com/en/weddings/img/DUN_2.jpg',
//         'https://www.phillymag.com/wp-content/uploads/sites/3/2021/10/main-3.jpg',
//         'https://images.squarespace-cdn.com/content/v1/5491d3cce4b0a85d8c259038/1587085892219-WEO3Q775GTCI8CF9VEQ6/august-south-congress-hotel-wedding.jpg',
//         'https://www.honeydewmoments.co.uk/wp-content/uploads/2020/10/Holbrow-Micro-Wedding-10.10.20-253-1-scaled.jpg'
//       ],
//     },
//   ]);
//   const imgWidth = Dimensions.get('screen').width * 0.33333;
//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 10 }}>
//       {albums.map((album) => (
//         <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5 }}>
//           {album.images.map((img) => (
//             <Image
//               style={{ width: imgWidth , height: imgWidth  }}
//               source={{ uri: img }}
//             />
//           ))}
//           <View
//             style={{
//               position: 'absolute',
//               bottom: 1,
//               left: 1,
//               backgroundColor: '#111',
//               paddingHorizontal: 1,
//               paddingVertical: 1,
//               borderRadius: 6,
//             }}
//           >
//             <Text style={{ color: '#fff', fontFamily: 'SSBold', fontSize: 20 }}>
//               {album.name}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }



// export default function ProfileScreen1() {


//   const [showContent, setShowContent] = useState('Photos');


//   return (
//     <View style={{ flex: 2}}>
//       <ScrollView showsVerticalScrollIndicator={true}>
//         <>
//           <View>
//             <Image
//               style={styles.coverImage}
//               source={{ uri: 'https://picsum.photos/500/500?random=211' }}
//             />
//           </View>
//           <View style={styles.profileContainer}>
//             {/* Profile Details */}
//             <View>
//               {/* Profile Image */}
//               <View style={styles.profileImageView}>
//                 <Image
//                   style={styles.profileImage}
//                   source={{
//                     uri: 'https://www.upskillist.com/assets/course-cards/website/wide/photography-21.png',
//                   }}
//                 />
//               </View>
//               {/* Profile Name and Bio */}
//               <View style={styles.nameAndBioView}>
//                 <Text style={styles.userFullName}>{'khairi'}</Text>
//                 <Text style={styles.userBio}>{'I love capturing photos'}</Text>
//               </View>
//               {/* Posts/Followers/Following View */}
//               <View style={styles.countsView}>
//                 <View style={styles.countView}>
//                   <Text style={styles.countNum}>30</Text>
//                   <Text style={styles.countText}>Posts</Text>
//                 </View>
//                 <View style={styles.countView}>
//                   <Text style={styles.countNum}>1246</Text>
//                   <Text style={styles.countText}>Followers</Text>
//                 </View>
//               </View>
              
//             </View>
//             {/* Profile Content */}
//             <View style={{ marginTop: 30 }}>
//               <View style={styles.profileContentButtonsView}>
//               <TouchableOpacity
//                   style={{
//                     ...styles.showContentButton,
//                     borderBottomWidth: showContent === 'Photos' ? 5 : 0,
//                   }}
//                   onPress={() => setShowContent('Photos')}
//                 >
//                   <Text style={styles.showContentButtonText}>PHOTOS</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{
//                     ...styles.showContentButton,
//                     borderBottomWidth: showContent === 'Albums' ? 5 : 0,
//                   }}
//                   onPress={() => setShowContent('Albums')}
//                 >
//                   <Text style={styles.showContentButtonText}>ALBUMS</Text>
//                 </TouchableOpacity>
                
//               </View>
//               {showContent === 'Photos' ? (
//                 <Photos photos={new Array(13).fill(2)} />
//               ) : showContent === 'Albums' ? (
//                 <Albums />
//               ) : (
//                 <Tags photos={new Array(23).fill(2)} />
//               )}
//             </View>
//           </View>
//         </>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   coverImage: { height: 300, width: '100%' },
//   profileContainer: {
//     // height: 1000,
//     backgroundColor: '#fff',
//     marginTop: -100,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   profileImageView: { alignItems: 'center', marginTop: -50 },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 3,
//     borderColor: '#fff',
//   },
//   nameAndBioView: { alignItems: 'center', marginTop: 10 },
//   userFullName: { fontFamily: 'SSBold', fontSize: 26 },
//   userBio: {
//     fontFamily: 'SSRegular',
//     fontSize: 18,
//     color: '#333',
//     marginTop: 4,
//   },
//   countsView: { flexDirection: 'row', marginTop: 20 },
//   countView: { flex: 2, alignItems: 'center' },
//   countNum: { fontFamily: 'SSBold', fontSize: 20 },
//   countText: { fontFamily: 'SSRegular', fontSize: 18, color: '#333' },
//   interactButtonsView: {
//     flexDirection: 'row',
//     marginTop: 10,
//     paddingHorizontal: 20,
//   },
  

//   profileContentButtonsView: {
//     flexDirection: 'row',
//     borderTopWidth: 2,
//     borderTopColor: '#f1f3f6',
//   },
//   showContentButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomColor: '#000',
//   },
//   showContentButtonText: {
//     fontFamily: 'SSRegular',
//     fontSize: 18,
//   },
// });