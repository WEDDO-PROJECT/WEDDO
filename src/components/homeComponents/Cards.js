import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';

function Cards(props) {
    const goProfile=()=>{

    // to profile 

    }
return (
        
        <View>
          <TouchableOpacity onPress={()=>props.setTView(null)}>
          
          <Image
               source={{
               uri:
              'https://img.icons8.com/ios/500/back--v1.png',
              }}
               style={{width: 50, height: 20,marginLeft:-80}}
   
          />
           <Text style= {{marginLeft:-75}}>
              Back 
           </Text>
           </TouchableOpacity>
            <View>
            
                {props.filtredData.map((elem,i)=>{
                  return(
                    <TouchableOpacity
                        key={i}
                        title="photographer"
                        onPress={goProfile}>

            <View>
                      <Text>{elem.professional_name}</Text>
                      
                      {/* <Image  style={{width:"50",height:"50"}} source={{uri:elem.logo}} /><Image/> */}
                      <Text>{elem.description} </Text>
                      <Text>{elem.pack_title}</Text>
                      <Text>{elem.pack_price}</Text>
                      
                  </View>
            </TouchableOpacity>


                  )
                })}
                

             </View>
            </View>
    );
}

export default Cards;