import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as Firestore from '../../api/firestore';

import UserGlobalInfo from './components/UserGlobalInfo'
import UserPrivateInfo from './components/UserPrivateInfo'

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing a user's profile screen.
 * This contains both global and private information which is only shown to users with permission.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const UserProfileScreen = ({route}) => {
    const userData = route.params.userData;
    const [status, setStatus] = useState("");

    /**
     * This is a render effect triggered upon component mount.
     */
    useEffect(() => {
        const unsub = Firestore.db_getFriendStatus(
            userData.uid,
            (userData) => {
                // console.log("exist")
                setStatus(userData.status);
            },
            () => {
                // console.log("dont exist")
                setStatus("none");
            },
        )
    }, [])

    /**
     * This is a render effect based on "status" state.
     */
    useEffect(() => {
        const unsub = Firestore.db_getFriendStatus(
            userData.uid,
            (userData) => {
                setStatus(userData.status);
            },
            () => {
                setStatus("none");
            },
        )
    }, [status])

    return (
        <SafeAreaView style={styles.screen}>

            <View style={styles.contentContainer}>

                {/* User Global Info */}
                <View style={styles.globalInfoContainer}>
                    <UserGlobalInfo
                        userData={userData}
                    />
                    <View style={styles.buttonContainer}>
                        {/* Add Friend Button */}
                        {(status == 'none') ? 
                            <Button
                                mode="contained"
                                style={{width: width * 0.8, height: height * 0.07, borderRadius: 10}}
                                contentStyle={{paddingVertical: 5}}
                                onPress={() => {
                                    Firestore.db_requestFriend(userData.uid);
                                    setStatus("pending");
                                }}
                                theme={{ dark: true, colors: {primary: '#7289DA', underlineColor: 'transparent'}, }}>
                                <Text style={{color: '#FFFFFF'}}>+ Add Friend</Text>
                            </Button>
                        : <></>}
                        

                        {/* Pending Button */}
                        {(status == 'pending') ? 
                            <Button
                                mode="outlined"
                                style={{width: width * 0.8, height: height * 0.07, borderRadius: 10, borderWidth: 2, borderColor: '#7289DA'}}
                                contentStyle={{paddingVertical: 5}}
                                onPress={() => {
                                    Alert.alert(
                                        "Withdraw Friend Request",
                                        "The friend request is still pending. Are you sure you want to withdraw the request?",
                                        [ {text: 'Cancel', onPress: () => {} },
                                        {text: 'Confirm', onPress: () => {
                                            Firestore.db_withdrawRejectRequest(userData.uid);
                                        } }]
                                    )
                                }}
                                theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                            >
                                <Text style={{color: '#FFFFFF'}}>Pending</Text>
                            </Button>
                        : <></>}
                        

                        {/* Accept Button */}
                        {/* Reject Button */}
                        {(status == 'request') ? 
                            <View style={styles.buttonContainer}>
                                <Button
                                    mode="contained"
                                    style={{width: width * 0.4, height: height * 0.07, borderRadius: 10}}
                                    contentStyle={{paddingVertical: 5}}
                                    onPress={() => {Firestore.db_acceptFriend(userData.uid)}}
                                    theme={{ dark: true, colors: {primary: '#7289DA', underlineColor: 'transparent'}, }}>
                                    <Text style={{color: '#FFFFFF'}}>Accept</Text>
                                </Button>

                                <Button
                                mode="outlined"
                                style={{width: width * 0.4, height: height * 0.07, borderRadius: 10, borderWidth: 2, borderColor: '#7289DA'}}
                                contentStyle={{paddingVertical: 5}}
                                onPress={() => {Firestore.db_withdrawRejectRequest(userData.uid)}}
                                theme={{ dark: true, colors: {primary: '#7289DA', underlineColor: 'transparent'}, }}>
                                <Text style={{color: '#FFFFFF'}}>Reject</Text>
                                </Button>
                            </View>
                        : <></>}

                        {/* Friend Button */}
                        {(status == 'friend') ? 
                            <Button
                                mode="outlined"
                                style={{width: width * 0.8, height: height * 0.07, borderRadius: 10, borderWidth: 2, borderColor: '#7289DA',}}
                                contentStyle={{paddingVertical: 5}}
                                onPress={() => {
                                    Alert.alert(
                                        "Remove Friend",
                                        "This user is your friend. Are you sure you want to remove user as friend?",
                                        [ {text: 'Cancel', onPress: () => {} },
                                        {text: 'Confirm', onPress: () => {
                                            Firestore.db_withdrawRejectRequest(userData.uid);
                                        } }]
                                    )
                                }}
                                theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                            >
                                <Text style={{color: '#BABBBF'}}>Friend</Text>
                            </Button>
                        : <></>}
                        
                    </View>
                    
                </View>

                {/* User Private Info */}
                <View style={styles.privateInfoContainer}>
                    {(status == 'friend') ?
                        <UserPrivateInfo
                            userData={userData}
                        />
                    : 
                    <View style={styles.privateInfoContainer}>
                        <SimpleLineIcons name="lock" size={width * 0.1} color="#72767D"/>
                        <Text style={styles.privateTitle}>User Info is Private</Text>
                        <Text style={styles.privateText}>Befriend User to View Info</Text>
                    </View>
                    
                    }
                </View>
                

            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen:{
        width: width,
        height: height * 0.9,
        backgroundColor: '#282b30',
    },
    contentContainer:{
        width: width,
        height: height * 0.8,
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
    },
    globalInfoContainer:{
        width: width,
        height: height * 0.35,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#36393E',
    },
    buttonContainer:{
        width: width,
        height: height * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },
    privateInfoContainer:{
        width: width,
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'purple',
    },
    privateTitle:{
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: height* 0.02,
        color: '#72767D',
    },
    privateText:{
        fontSize: 14,
        color: '#72767D',
    },
})

export default UserProfileScreen;
