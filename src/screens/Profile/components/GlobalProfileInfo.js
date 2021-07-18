import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Firestore from '../../../api/firestore';

const {width, height} = Dimensions.get("window")

const GlobalProfileInfo = (props) => {
    const userData = props.userData;
    
    const [displayName, setDisplayName] = useState(userData.displayName);
    const [displayPicture, setDisplayPicture] = useState(require('../../../assets/icons/defaultprofile.png'));
    const [description, setDescription] = useState(userData.description);
    const [uid, setUID] = useState(userData.uid);

    useEffect(() => {
        setDisplayName(userData.displayName);
        setUID(userData.uid);
        Firestore.storage_retrieveProfilePic(setDisplayPicture, () => setDisplayPicture({uri:""}));
        setDescription(userData.description);
    }, [userData]);

    useEffect(() => {
        Firestore.storage_retrieveProfilePic(setDisplayPicture, () => setDisplayPicture({uri:""}));
    })

    const uploadProfilePic = async () => {

        let results = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [2, 2],
        })

        if (!results.cancelled) {
            console.log('Image location/uri: ');
            console.log(results.uri);
            setDisplayPicture({uri: results.uri});
            Firestore.storage_uploadProfilePic(results.uri);
        }
    };

    return (
        <View style={styles.componentContainer}>

            {/* Profile Picture */}
            <TouchableOpacity style={styles.profilePicContainer}>
                {(displayPicture.uri != "") &&
                    <Image style={styles.profilePicContainer} source={displayPicture} />
                } 
            </TouchableOpacity>

            {/* User Info */}
            <View style={styles.infoContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText} numberOfLines={1}>{displayName}</Text>
                </View>
                <View style={styles.idContainer}>
                    <Text style={styles.idText} numberOfLines={1}>ID: {uid}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        {description}
                    </Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.25,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: '#4F535C',
    },
    profilePicContainer:{
        height: height * 0.15,
        aspectRatio: 1,
        borderRadius: width,
        backgroundColor: '#4F535C',
    },
    infoContainer:{
        width: (width * 0.95) - (height * 0.15) - (width * 0.05),
        height: height * 0.22,
        justifyContent: 'space-between',
        // backgroundColor: 'green',
    },
    nameContainer:{
        width: (width * 0.95) - (height * 0.15) - (width * 0.05),
        height : height * 0.05,
        paddingHorizontal: width * 0.025,
        justifyContent: 'flex-end',
        // backgroundColor: 'red',
    },
    nameText:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
    },
    idContainer:{
        width: (width * 0.95) - (height * 0.15) - (width * 0.05),
        height : height * 0.025,
        paddingHorizontal: width * 0.025,
        justifyContent: 'flex-start',
        // backgroundColor: 'orange',
    },
    idText:{
        fontSize: 10,
        color: '#BABBBF',
    },
    descriptionContainer:{
        width: (width * 0.95) - (height * 0.15) - (width * 0.05),
        height : height * 0.13,
        paddingHorizontal: width * 0.025,
        // backgroundColor: 'yellow',
    },
    descriptionText:{
        fontSize: 14,
        color: '#FFFFFF',
    },
});

export default GlobalProfileInfo;