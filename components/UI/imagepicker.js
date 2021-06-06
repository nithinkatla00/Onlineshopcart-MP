import React,{useState} from 'react';
import {View,Text,StyleSheet,Button,Image,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

const Imgpicker=(props)=>{
    const [image, setImage] = useState(null);
    const [base64Img,setBase64Img] = useState(null);
    const verifyPermissions = async (value) => {
        let result;
        if(value==='take'){
            result = await Permissions.askAsync(Permissions.CAMERA);
        // if(Platform.OS==='ios'){
        //     const result2 = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // }
        }else if(value==='pick'){
            result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        }
        if (result.status !== 'granted') {
          Alert.alert(
            'Insufficient permissions!',
            'You need to grant camera permissions to use this app.',
            [{ text: 'Okay' }]
          );
          return false;
        }
        return true;
      };

      const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions('take');
        if (!hasPermission) {
          return;
        }
        const result = await ImagePicker.launchCameraAsync({
          base64: true,
          allowsEditing: true,
          aspect: [4,3],
          quality:0.2
        });
        setImage(result.uri);
        await setBase64Img(`data:image/jpg;base64,${result.base64}`)
        console.log(base64Img)
      };

    const pickImage = async () => {
        const hasPermission = await verifyPermissions('pick');
        if (!hasPermission) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          base64: true,
          allowsEditing: true,
          aspect: [4, 3],
          quality:0.2
        });
        if (!result.cancelled) {
          setImage(result.uri);
        }
        await setBase64Img(`data:image/jpg;base64,${result.base64}`)
        console.log(base64Img)
      };

    return(
        <View style={styles.centered}>
            <Image style={{width: 100,height: 100}} source={{uri:image}} />
            <View style={{flexDirection:'row'}}>
                <View>
                <Button
                title="Take pic"
                onPress={takeImageHandler}
                />
                </View>
                <View style={{marginLeft:10}}>
                <Button 
                title="gallery"
                style={styles.button1}
                onPress={pickImage}
                />
                </View>
                <View style={{marginLeft:10}}>
                <Button 
                title="submit"
                style={styles.button1}
                onPress={()=> {props.onSubmitimg(base64Img)}}
                />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    centered: {
        flex: 1
      }
});
export default Imgpicker;