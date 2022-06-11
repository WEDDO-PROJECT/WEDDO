import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Button,
} from "react-native";
import * as Permissions from "expo-permissions";
import Animated from "react-native-reanimated";
import StorageUtils from "../Utils/StorageUtils.js";
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
import axios from "axios";
const { height, width } = Dimensions.get("window");
// Fonts
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import Gallery from "react-native-image-gallery";
import MapView, { Marker, Region, LatLng, Point } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BasePath from "../constants/BasePath";
import BottomSheet from "reanimated-bottom-sheet";
import { useFonts } from "expo-font";
const WeddingHallDetails = ({ navigation, route }) => {
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
  const [price, setPrice] = useState("");
  const [nom, setNom] = useState("");
  const [langitude, setLangitude] = useState(null);
  const [rating, setRating] = React.useState(null);
  const [latitude, setLatitude] = useState(null);
  const [isClient, setIsClient] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [logo, setLogo] = useState("");
  const [id, setId] = useState(null);
  const [showContent, setShowContent] = useState("Photos");

  let region = {
    longitude: 10.1785077, //myLocation.coords.longitude,
    latitude: 36.8868947, //myLocation.coords.latitude,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  };
  const [myRegion, setRegion] = useState(undefined);
  const mapRef = useRef(null);

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const updaterating = (val) => {
    let obj = {
      user_id: 109,
      sp_id: id,
      rating: val,
    };

    axios.post(`${BasePath}/api/sp/rating/create`, obj).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    async function getUser() {
      let data;
      await StorageUtils.retrieveData("user").then((value) => {
        data = JSON.parse(value);
        setName(data.owner_name);
        setEmail(data.email);
        setCategory(data.category);
        setCin(data.cin);
        setTel(data.tel);
        setLangitude(data.langitude);
        setLatitude(data.latitude);
        setNom(data.professional_name);
        setPrice(data.pack_price);
        setId(data.id);
        setLogo(data.logo);
        setWeddinghall(data);
        setRating(Math.floor(Math.random() * 6) + 1);
        // StorageUtils.retrieveData('user').then((value) => {
        //   data = JSON.parse(value)
        //   setIsClient(data === 'client')
        // })

        axios
          .get(BasePath + "/api/sp/getimages/" + data.id)
          .then((response) => {
            console.log(response.data.result);
            for (let i = 0; i < response.data.result.length; i++) {
              let s = {
                source: { uri: response.data.result[i].image },
              };
              setImages((images) => [...images, s]);
            }
          })
          .catch((error) => {
            console.log(error);
          });

        let region = {
          longitude: Number(latitude), //myLocation.coords.longitude,
          latitude: Number(langitude), //myLocation.coords.latitude,
          latitudeDelta: LONGITUDE_DELTA,
          longitudeDelta: LATITUDE_DELTA,
        };
        setRegion(region);
      });
    }
    getUser();
  }, [refresh]);

  const addRequest = () => {
    let obj = {
      user_id: 109,
      sp_id: id,
      date: "07/06/2022",
    };
    axios
      .post(`${BasePath}/api/sp/request/create`, obj)
      .then((res) => console.log(res));
  };

  function goBack() {
    console.log("bhvfjnfnvfvn");
    navigation.toggleDrawer();
  }

  function edit() {
    navigation.navigate("EditProfileSPRoom");
  }
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };
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
      const name = "aaaa";
      const source = {
        uri,
        type,
        name,
      };
      cloudinaryUpload(source);
      let s = {
        source: { uri: uri },
      };

      setImages((images) => [...images, s]);
      bs.current.snapTo(1);
      // console.log(source)
    }
  };
  function goBack() {
    console.log("bhvfjnfnvfvn");
    navigation.toggleDrawer();
  }

  function Edite() {
    navigation.navigate("EditProfileSPRoom");
  }
  const cloudinaryUpload = async (result) => {
    const data = new FormData();
    data.append("file", {
      type: "image/jpeg",
      uri: result.uri,
      name: "file.jpeg",
    });
    data.append("upload_preset", "expopreset");
    data.append("cloud_name", "pentagon");
    fetch("https://api.cloudinary.com/v1_1/pentagon/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const body = {
          image: data.secure_url,
          sp_id: weddinghall.id,
        };

        axios
          .post(BasePath + "/api/sp/AddImage", body)
          .then((response) => {
            console.log(response);
            // const data =response.data.result[0]
            // navigation.navigate("WeddingHallDetails",{weddinghalldata : data})
            // console.log(data)
          })
          .catch((error) => {
            console.log(error);
          });
        //setPhoto(data.s ecure_url)
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("An Error Occured While Uploading");
      });
  };
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        const uri = data.uri;
        const type = data.type;
        const name = "aaaa";
        const source = {
          uri,
          type,
          name,
        };
        let s = {
          source: { uri: uri },
        };
        setImages((images) => [...images, s]);
        cloudinaryUpload(data);
        bs.current.snapTo(1);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}></View>
      <TouchableOpacity style={styles.panelButton} onPress={pickFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
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

  function Photos({ photos }) {
    const imgWidth = Dimensions.get("screen").width * 0.33333;
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <View>
            <Gallery
              style={{ width: imgWidth, height: imgWidth }}
              images={images}
            />
          </View>
        </View>
      </View>
    );
  }

  // function Albums() {
  //   const [albums] = useState([(images = { images })]);
  //   const imgWidth = Dimensions.get("screen").width * 0.33333;
  //   return (
  //     <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 20 }}>
  //       {albums.map((album) => (
  //         <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
  //           {album.images.map((img) => (
  //             <Image
  //               style={{ width: imgWidth + 50, height: imgWidth + 50 }}
  //               source={{ uri: img }}
  //             />
  //           ))}
  //           <View
  //             style={{
  //               position: "absolute",
  //               bottom: 10,
  //               left: 10,
  //               backgroundColor: "#111",
  //               paddingHorizontal: 10,
  //               paddingVertical: 4,
  //               borderRadius: 6,
  //             }}
  //           >
  //             <Text style={{ color: "#fff", fontFamily: "", fontSize: 20 }}>
  //               {album.name}
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // }

  function Location() {
    return (
      <View style={{}}>
        {/* <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {photos.map((photo, index) => (
            <View>
              <Image
                style={{ width: imgWidth, height: imgWidth }}
                source={{
                  uri: `https://picsum.photos/200/300?random=${index + 100}`,
                }}
              />
            </View>
          ))}
        </View> */}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View>
            <Image style={styles.coverImage} />
          </View>
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                <Image source={{ uri: logo }} />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{name}</Text>
                <Text style={styles.userBio}>{category}</Text>
                <View style={{ marginBottom: 5 }}></View>
                <Icon name="phone" color="#777777" size={20}>
                  <Text
                    style={{ fontSize: 16, color: "#777777", marginBottom: 5 }}
                  >
                    {tel}
                  </Text>
                </Icon>

                <View style={{ marginBottom: 5 }}></View>
                <Icon name="email" color="#777777" size={20}>
                  <Text
                    style={{ fontSize: 16, color: "#777777", marginRight: 20 }}
                  >
                    {email}
                  </Text>
                </Icon>
              </View>
              {/* Posts/Followers/Following View */}
              {/* <View style={styles.countsView}>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>13</Text>
                  <Text style={styles.countText}>Posts</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>1246</Text>
                  <Text style={styles.countText}>Followers</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>348</Text>
                  <Text style={styles.countText}>Following</Text>
                </View>
              </View> */}
              <View>
                <Modal isVisible={isModalVisible}>
                  <View style={{ flex: 1 }}>
                    <MapView
                      onRegionChange={() => mapRef.current.forceUpdate()}
                      ref={mapRef}
                      style={styles.map}
                      initialRegion={myRegion}
                    >
                      {weddinghall && (
                        <Marker
                          coordinate={{
                            latitude: Number(weddinghall.latitude),
                            longitude: Number(weddinghall.longitude),
                          }}
                        ></Marker>
                      )}
                    </MapView>
                    <Button title="Hide" onPress={toggleModal} />
                  </View>
                </Modal>
              </View>
              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity
                  style={styles.interactButton}
                  onPress={() => {
                    bs.current.snapTo(0);
                  }}
                >
                  <Text style={styles.interactButtonText}>Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: "white",
                    borderWidth: 2,
                    borderColor: "#BF9B30",
                  }}
                >
                  <Text
                    style={{ ...styles.interactButtonText, color: "#BF9B30" }}
                    onPress={{ Edite }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Mutual Followed By Text */}
              {/* <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
                <Text style={{ fontFamily: "", fontSize: 16 }}>
                  {"Followed by "}
                  <Text style={{ fontFamily: "" }}>john_doe </Text>
                  {"and "}
                  <Text style={{ fontFamily: "" }}>19 others</Text>
                </Text>
              </View> */}
            </View>
            {/* Profile Content */}
            <View style={{ marginTop: 20 }}>
              <View style={styles.profileContentButtonsView}>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === "Photos" ? 2 : 0,
                  }}
                  onPress={() => setShowContent("Photos")}
                >
                  <Text style={styles.showContentButtonText}>Photos</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === "Albums" ? 2 : 0,
                  }}
                  onPress={() => setShowContent("Albums")}
                >
                  <Text style={styles.showContentButtonText}>Albums</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === "Location" ? 2 : 0,
                  }}
                  onPress={() => setShowContent("Location")}
                >
                  <Text
                    style={styles.showContentButtonText}
                    onPress={toggleModal}
                  >
                    Location
                  </Text>
                </TouchableOpacity>
              </View>
              {showContent === "Photos" ? (
                <Photos photos={new Array(13).fill(1)} />
              ) : showContent === "Albums" ? (
                <Albums />
              ) : (
                <Location photos={new Array(23).fill(1)} />
              )}
            </View>
          </View>
        </>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
      </ScrollView>
    </View>
  );
};

export default WeddingHallDetails;

const styles = StyleSheet.create({
  coverImage: { height: 300, width: "100%" },
  profileContainer: {
    // height: 1000,
    backgroundColor: "#fff",
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: "center", marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  nameAndBioView: { alignItems: "center", marginTop: 10 },
  userFullName: { fontFamily: "", fontSize: 26 },
  userBio: {
    fontFamily: "",
    fontSize: 18,
    color: "#333",
    marginTop: 4,
  },
  countsView: { flexDirection: "row", marginTop: 20 },
  countView: { flex: 1, alignItems: "center" },
  countNum: { fontFamily: "", fontSize: 20 },
  countText: { fontFamily: "", fontSize: 18, color: "#333" },
  interactButtonsView: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#BF9B30",
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    fontFamily: "",
    color: "#fff",
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#f1f3f6",
  },
  showContentButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#BF9B30",
  },
  showContentButtonText: {
    fontFamily: "",
    fontSize: 18,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#BF9B30",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
