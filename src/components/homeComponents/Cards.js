import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';

function Cards(props) {
    const goProfile=()=>{

    // to profile 

    }
return (
        
        <View>
            <View>
            
                {props.filtredData.map((elem,i)=>{
                  return(
                    <TouchableOpacity
                        key={i}
                        title="photographer"
                        onPress={goProfile}>

            <View>
                      <Text>{elem.professional_name}</Text>
                      
                      {/* <Image  style={{width:"200px",height:"200px"}} source={elem.logo} /><Image/> */}
                      <Text>{elem.description} </Text>
                      <Text>{elem.pack_title}</Text>
                      <Text>{elem.pack_price}</Text>
                      
                  </View>
</TouchableOpacity>


                  )
                })}
                <TouchableOpacity onPress={()=>props.setTView(null)}>
          
                 <Image
            source={{
              uri:
                'https://img.icons8.com/ios/500/back--v1.png',
            }}
            style={{width: 50, height: 50}}
          
              />
                </TouchableOpacity>

             </View>
        </View>
    );
}

export default Cards;