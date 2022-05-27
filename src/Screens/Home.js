import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Cards from "../components/homeComponents/Cards";
import Background from "../assets/Background.webp";
import StorageUtils from "../Utils/StorageUtils";
const Home = () => {
  let imagePh = "../assets/iconPhotogrape.png";
  let imageBand = "../assets/band.png";
  let imageHS = "../assets/hair.jpg";
  let imageHall = "../assets/hall.png";

  const [person, setPerson] = useState(null);
  const [allData, setAllData] = useState([]);
  const [filtredData, setFIltredData] = useState([]);
  const [view, setView] = useState(null);
  const array = [
    {
      logo: "/",
      professional_name: "the dreamer",
      description: "photographe professionnel",
      category: "photographer",
      pack_title: "VIP",
      pack_price: "700 DTN",
    },
    {
      logo: "/",
      professional_name: "boudinar",
      description: "stambali mezwed fatma bouseha",
      category: "band",
      pack_title: "VIP",
      pack_price: "700 DTN",
    },
    {
      logo: "/",
      professional_name: "islem",
      description: "hair + hsjkqsqks+qsdkjdksjd+",
      category: "hairSalon",
      pack_title: "VIP",
      pack_price: "700 DTN",
    },
    {
      logo: "/",
      professional_name: "darna",
      description: "surface 1200 person",
      category: "weddingHall",
      pack_title: "VIP",
      pack_price: "700 DTN",
    },
  ];
  useEffect(() => {
    // bring the url from the backend

    StorageUtils.retrieveData("user").then((value) =>
      //setUser(JSON.parse(value))
      console.log(value)
    );
    // axios.get('')
    // .then(res=>setAllData(res.data))
    // .catch(err=>console.log(err))
    setAllData(array);
    // AsyncStorage.getItem('person')
    // .then(res=>console.log(res))
  }, []);
  const buttonFunction = (val) => {
    var array = [];
    if (val == 1) {
      array = allData.filter((elem, i) => elem.category == "photographer");
      setFIltredData(array);
      setView(1);
    }
    if (val === 2) {
      array = allData.filter((elem, i) => elem.category == "band");
      setFIltredData(array);
      setView(1);
    }
    if (val === 3) {
      array = allData.filter((elem, i) => elem.category == "hairSalon");
      setFIltredData(array);
      setView(1);
    }
    if (val === 4) {
      array = allData.filter((elem, i) => elem.category == "weddingHall");
      setFIltredData(array);
      setView(1);
    }
  };

  return (
    <ImageBackground
      style={{
        width: "100%",
        height: "100%",
      }}
      source={Background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {view == null && (
          <View
            style={{
              // flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
              // height:"50px",
              // width:"50px",
              // borderColor:'black'
            }}
          >
            <TouchableOpacity
              title="photographer"
              onPress={() => buttonFunction(1)}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require(imagePh)}
              />
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                photographer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity title="band" onPress={() => buttonFunction(2)}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require(imageBand)}
              />
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>Band</Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="hairSalon"
              onPress={() => buttonFunction(3)}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require(imageHS)}
              />
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                Hair Salon
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="weddingHall"
              onPress={() => buttonFunction(4)}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require(imageHall)}
              />
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                Wedding Hall
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {view && (
          <View>
            <Cards
              view={view}
              filtredData={filtredData}
              setTView={setView}
            ></Cards>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
