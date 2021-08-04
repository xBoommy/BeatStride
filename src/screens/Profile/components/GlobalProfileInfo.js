import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as Firestore from '../../../api/firestore';

import ProfilePictureView from './ProfilePictureView';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing Information available for view to everyone.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const GlobalProfileInfo = (props) => {
    const userData = props.userData;
    
    const [displayName, setDisplayName] = useState(userData.displayName);
    const [displayPicture, setDisplayPicture] = useState({uri: ""});
    const [description, setDescription] = useState(userData.description);
    const [uid, setUID] = useState(userData.uid);

    useEffect(() => {
        setDisplayName(userData.displayName);
        setUID(userData.uid);
        setDescription(userData.description);
    }, [userData]);

    useEffect(() => {
        Firestore.storage_retrieveProfilePic(setDisplayPicture, () => setDisplayPicture({uri:""}));
    })

    const [toggleImage, setToggleImage] = useState(false);

    return (
        <View style={styles.componentContainer}>

            {/* Profile Picture */}
            <TouchableOpacity style={styles.profilePicContainer} onPress={() => setToggleImage(true)}>
                {(displayPicture.uri != "") &&
                    <Image style={styles.profilePicContainer} source={displayPicture} />
                } 
            </TouchableOpacity>

            {/* View Profile Picture */}
            <ProfilePictureView
                toggleImage={toggleImage}
                setToggleImage={setToggleImage}
                displayPicture={displayPicture}
            />

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
