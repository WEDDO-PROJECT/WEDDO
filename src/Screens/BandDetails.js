import React, { useState,useEffect ,useRef} from 'react';


const BandDetails = ({navigation,route})=>{

    
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          console.log(image);
          setImage(image.path);
          bs.current.snapTo(1);
        });
      }
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        
    
        if (!result.cancelled) {
            const uri = result.uri;
            const type = result.type;
            const name = 'aaaa';
            const source = {
              uri,
              type,
              name,
            }
            cloudinaryUpload(source)
            let s = {
              source: { uri:uri}
            }

            setImages(images => [...images, s]);
            bs.current.snapTo(1)
          }
        
      };
      const cloudinaryUpload = async (result) => {
      
        const data = new FormData()
        data.append('file', {  type:'image/jpeg', uri : result.uri , name:'file.jpeg'})
        data.append('upload_preset', 'expopreset')
        data.append("cloud_name", "pentagon")
        fetch("https://api.cloudinary.com/v1_1/pentagon/upload", {
          method: "post",
          body: data
        }).then(res => res.json()).
          then(data => {
            console.log(data)

            const body ={
              image: data.secure_url,
              sp_id: weddinghall.id
            }

            axios 
              .post(BasePath + "/api/sp/AddImage",body)
              .then((response)=>{
                console.log(response)
                
              })
              .catch((error)=>{
                console.log(error)
              })
          }).catch(err => {
            console.log(err)
            Alert.alert("An Error Occured While Uploading")
          })
      
      
      
      
        
      }
      const pickFromCamera = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
             let data =  await ImagePicker.launchCameraAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
            if(!data.cancelled){
              const uri = data.uri;
              const type = data.type;
              const name = 'aaaa';
              const source = {
                uri,
                type,
                name,
              }
              let s = {
                source: { uri:uri}
              }
              setImages(images => [...images, s]);
              cloudinaryUpload(data)
              bs.current.snapTo(1)
            }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }
  
         const  renderInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
          </View>
          <TouchableOpacity style={styles.panelButton} onPress={pickFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bs.current.snapTo(1)}>
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


  return(

    <ScrollView>
      
    <View style={{flexDirection :'row' , marginTop : 60}}>
    
    <Title style={{marginLeft : '21%' ,fontSize:23, marginBottom:15,marginTop:15,color:'#FDC12A'}}> Band Galery</Title>
     
    </View>
   
        <View style={[styles.row ,{marginLeft :35}]}>
            
        </View>

        <View>
</View>
    <Gallery
    style={{ flex: 1, height: 270 }}
    images={images}
  />
    <View>
    <TouchableOpacity style={styles.commandButton} onPress={() => {bs.current.snapTo(0)}}>
      <Text style={styles.panelButtonTitle}>Add Images</Text>
    </TouchableOpacity>
    <BottomSheet
    ref={bs}
    snapPoints={[330, 0]}
    renderContent={renderInner}
    renderHeader={renderHeader}
    initialSnap={1}
    callbackNode={fall}
    enabledGestureInteraction={true}
  />
    </View>
   </ScrollView>
)

}
