import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { CommonActions } from "@react-navigation/native";
import * as Authentication from "../../api/auth";
import * as Firestore from '../../api/firestore';

import Screen from '../MainScreen';
import GlobalProfileInfo from './components/GlobalProfileInfo'
import PrivateProfileInfo from './components/PrivateProfileInfo'

const {width, height} = Dimensions.get("window")

const ProfileScreen = ({navigation}) => {

    const [userData, setUserData] = useState({
        totalDistance: 0,
        runCount: 0,
        longestDistance: 0,
        fastestPace: 0,
        strideDistance: 0,
        joinDate: ","
    });

    useEffect(() => {
        Firestore.db_getUserDataSnapshot(
            (userData) => { setUserData(userData) },
            (error) => {console.log(error)},
        )
    }, [])

    const [isLogoutLoading, setIsLogoutLoading] = useState(false);

    const handleLogout = () => {
        setIsLogoutLoading(true);
        Authentication.signOut(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
            }),);
        }, console.error);
    };

    return (
        <Screen>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>

            <View style={styles.contentContainer}>

                {/* User Global Info */}
                <View style={styles.globalInfoContainer}>
                    <GlobalProfileInfo
                        userData={userData}
                    />
                </View>

                {/* User Private Info */}
                <PrivateProfileInfo
                    userData={userData}
                />

            </View>

            {/* Edit Profile */}
            <View style={styles.ButtonContainer}>
                <Button
                    mode="contained"
                    style={{width: width * 0.8, borderRadius: 10,  backgroundColor: '#72767D'}}
                    contentStyle={{paddingVertical: 5}}
                    onPress={() => {navigation.navigate("EditProfileScreen", {userData: userData});}}
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}>
                    <Text style={{color: '#FFFFFF'}}>Edit Profile</Text>
                </Button>
            </View>

            {/* Logout button */}
            <View style={styles.ButtonContainer}>
                <Button
                    mode="contained"
                    style={{width: width * 0.8, borderRadius: 10}}
                    contentStyle={{paddingVertical: 5}}
                    onPress={handleLogout}
                    loading={isLogoutLoading}
                    disabled={isLogoutLoading}
                    theme={{ dark: true, colors: {primary: '#7289DA', underlineColor: 'transparent'}, }}>
                    <Text style={{color: '#FFFFFF'}}>Log Out</Text>
                </Button>
            </View>
            
        </Screen>
    );
};

const styles = StyleSheet.create({
    header:{
        width: width,
        height: height * 0.1,
        justifyContent:'center',
        paddingHorizontal: '10%',
        backgroundColor: '#1e2124',
    },
    headerText:{
        color: '#BABBBF',
        fontSize: 28,
        fontWeight: 'bold',
        height: height * 0.1,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    contentContainer:{
        width: width,
        height: height * 0.65,
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: 'yellow',
    },
    globalInfoContainer:{
        width: width,
        height: height * 0.25,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#36393E',
    },
    ButtonContainer:{
        width: width,
        height: height * 0.15 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },
})

export default ProfileScreen;