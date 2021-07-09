import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';

const {width, height} = Dimensions.get("window")

// max 12 characters
const name = "WWWWWWWWWWWW"

// max 5 lines
// max 80 characters
const description = "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"

const GlobalProfileInfo = (props) => {
    const userData = props.userData;
    
    const [displayName, setDisplayName] = useState(userData.displayName);
    const [uid, setUID] = useState(userData.uid);

    useEffect(() => {
        setDisplayName(userData.displayName);
        setUID(userData.uid);
    }, [userData])

    return (
        <View style={styles.componentContainer}>

            {/* Profile Picture */}
            <View style={styles.profilePicContainer}>

            </View>

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
        width: width * 0.95,
        height: height * 0.24,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#4F535C',
    },
    profilePicContainer:{
        height: height * 0.15,
        aspectRatio: 1,
        borderRadius: width,
        backgroundColor: 'brown',
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