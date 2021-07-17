import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableWithoutFeedback, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Firestore from '../../../api/firestore';

const {width, height} = Dimensions.get("window")

const FriendItem = (props) => {
    const navigation = useNavigation();
    const item = props.item;
    const uid = item.uid;

    const [displayName, setDisplayName] = useState('');
    const [displayPicture, setDisplayPicture] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // console.log(uid)
        Firestore.db_getOtherDataSnapshot(
            uid,
            (userData) => {
                setUserData(userData)
                setDisplayName(userData.displayName)
                // console.log(userData)
            },
            (error) => {console.log(error)},
        )
    }, [])

    return (
        <TouchableWithoutFeedback onPress={() => {navigation.navigate("UserProfile", {userData: userData})}}>
            <View style={styles.componentContainer}>

                {/* profile image */}
                <View style={styles.pictureContainer}>

                </View>

                {/* Data Container */}
                <View style={styles.dataContainer}>

                    {/* Display name */}
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText} numberOfLines={1}>{displayName}</Text>
                    </View>

                    {/* User id */}
                    <View style={styles.idContainer}>
                        <Text style={styles.idText} numberOfLines={1}>{uid}</Text>
                    </View>
                    
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.15,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
        // backgroundColor: 'purple',
        // borderColor: '#FFFFFF',
        // borderWidth: 1,
    },
    pictureContainer:{
        height: height * 0.1,
        aspectRatio: 1,
        borderRadius: height,
        marginLeft: width * 0.05,
        backgroundColor: 'pink',
    },
    dataContainer:{
        height: height * 0.1,
        width: width * 0.9 - (height * 0.1),
        marginLeft: width * 0.05,
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    nameContainer:{
        height: height * 0.04,
        width: width * 0.6 - (height * 0.08),
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        // backgroundColor: 'green',
    },
    nameText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
    },
    idContainer:{
        height: height * 0.04,
        width: width * 0.7 - (height * 0.08),
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'blue',
    },
    idText:{
        fontSize: 10,
        color: '#BABBBF',
    },
})

export default FriendItem;