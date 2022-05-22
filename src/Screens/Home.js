import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Cards from '../components/homeComponents/Cards';
const Home = () => {
  const [person,setPerson]=useState(null)
  const [allData,setAllData]=useState([])
  const [filtredData,setFIltredData]=useState([])
  const [view,setView]=useState(null)
  useEffect(()=>{         // bring the url from the backend  
    axios.get('')
    .then(res=>setAllData(res.data))
    .catch(err=>console.log(err))
    AsyncStorage.getItem('person')
    .then(res=>console.log(res))

  },[])
  const buttonFunction=(val)=>{
    var array=[]
if (val==1){
  array=allData.filter((elem,i)=> elem.role=='photographer')
  setFIltredData(array)
  setView(1)
}
if (val===2){
  array=allData.filter((elem,i)=> elem.role=='band')
  setFIltredData(array)
  setView(1)
}
if (val===3){
  array=allData.filter((elem,i)=> elem.role=='hairSalon')
  setFIltredData(array)
  setView(1)
}
if (val===4){
  array=allData.filter((elem,i)=> elem.role=='weddingHall')
  setFIltredData(array)
  setView(1)
}

  }


    return ( 
        <View style={styles.container}>
          
          {view=null&&<View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            

            <TouchableOpacity
              title="photographer"
              onPress={() => buttonFunction(1)}
            >
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                
                photographer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="photographer"
              onPress={() => buttonFunction(2)}
            >
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                
                photographer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="photographer"
              onPress={() => buttonFunction(3)}
            >
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                
                photographer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="photographer"
              onPress={() => buttonFunction(4)}
            >
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                
                photographer
              </Text>
            </TouchableOpacity>
         
            </View>}
            {view&&<View>
              
             <Cards view={view} filtredData={filtredData} setView={setView}></Cards> 
             </View>}


            
        </View>




        
        
     );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    
    },
  });
export default Home;