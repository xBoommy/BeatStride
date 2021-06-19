import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import * as Firestore from '../../../api/firestore';
import * as ImagePicker from 'expo-image-picker';

const {height} = Dimensions.get('window');

export default ({image}) => {

    const defaultProfilePic = require('../../../assets/icons/defaultprofile.png');
    const [loadedProfilePic, setLoadedProfilePic] = useState(defaultProfilePic);

    useEffect(() => {
        //"Firestore" not really, its Firebase.storage
        Firestore.storage_retrieveProfilePic(setLoadedProfilePic, () => console.log('Cannot retrieve profile picture'));
    },[]);

    // const getUserPermission = async () => { //(For IOS supposedly, but method not working anyways
    //     const res = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     if (res.status !== 'granted') {
    //       Alert.alert('Permissions not granted!');
    //       return false;
    //     }
    //     return true;
    // };
   

    const uploadProfilePic = async () => {
        // const hasPermission = await getUserPermission();
        // if (!hasPermission) {
        //   console.log("No Permissions!");
        //   return;
        // }
        //Only works for android, IOS needs Permissions 
        let results = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
        })

        if (!results.cancelled) {
            console.log('Image location/uri: ');
            console.log(results.uri);
            setLoadedProfilePic({uri: results.uri});
            //Need to something with database
            Firestore.storage_uploadProfilePic(results.uri);
        }
    };
    return (
      <View>
        <TouchableOpacity onPress={uploadProfilePic}>
          <Image source={loadedProfilePic} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 0.15 * height,
        width: 0.15 * height,
        borderColor: '#505050',
        borderWidth: 8,
        borderRadius: 0.1 * height,
        marginBottom: 10,
    }
})
