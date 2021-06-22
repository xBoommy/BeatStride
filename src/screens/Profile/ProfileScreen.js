import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { CommonActions } from "@react-navigation/native";
import * as Authentication from "../../api/auth";


import Screen from '../MainScreen';

const {width, height} = Dimensions.get("window")

const ProfileScreen = ({navigation}) => {

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

            <Button
                mode="contained"
                style={{marginTop: 10, borderRadius: 10}}
                contentStyle={{paddingVertical: 5}}
                onPress={handleLogout}
                loading={isLogoutLoading}
                disabled={isLogoutLoading}
                theme={{ dark: true, colors: {primary: '#7289DA', underlineColor: 'transparent'}, }}>
                <Text style={{color: '#FFFFFF'}}>Log Out</Text>
            </Button>
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
})

export default ProfileScreen;