import React from 'react';


import {View,Text,TouchableOpacity} from 'react-native';

function Cards(props) {
const goProfile=()=>{

    // to profile 

}
    return (
        <View>
            <View>
            
                {props.filtredData.map(()=>{
                  return(
<TouchableOpacity
title="photographer"
onPress={goProfile}>

                  <View>
                      <Text>elem.professional_name</Text>
                      <Text>{elem.title}</Text>
                      <Image  style={{width:"200px",height:"200px"}} source={elem.image} /><Image/>
                      <Text>elem.description </Text>
                      <Text>elem.title</Text>
                      
                  </View>
</TouchableOpacity>

                  )
                })}

             </View>
        </View>
    );
}

export default Cards;