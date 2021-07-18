import React, { useState, useRef, useContext } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Authentication from '../../api/auth';
import * as Firestore from '../../api/firestore';

const {width, height} = Dimensions.get('window');

const EditProfileScreen = ({navigation, route}) => {
    const userData = route.params.userData;
    const [username, setUsername] = useState(userData.displayName);
    const [description, setDescription] = useState(userData.description);
    const [picture, setPicture] = useState({uri:""});
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);

    const updateProfile = () => {
        Keyboard.dismiss();
        setIsUpdateLoading(true);

        Firestore.db_updateProfile(
            {displayName: username, description: description},
            () => {
                setIsUpdateLoading(false);
                navigation.goBack();
            },
            () => {
                setIsUpdateLoading(false);
                return console.error(error);
            },
        )

        //Update image storage (userData.uid)
            
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView 
                contentContainerStyle={styles.screenScroll} 
                keyboardShouldPersistTaps="always" 
                showsVerticalScrollIndicator={false}
            >

                {/* Header */}
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.subtitle}>Update your account</Text>
                
                {/* Username */}
                <TextInput
                    mode="outlined"
                    label="Username"
                    style={{ marginTop: 10 }}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    blurOnSubmit={false}
                    left={<TextInput.Icon name="account" color={username ? '#7289DA' : '#BABBBF'} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                {/* Profile Picture */}
                <Text style={styles.labelText}>Profile picture</Text>

                <Button
                    mode="contained"
                    style={{ marginTop: 10, marginBottom: 10, borderRadius: 10 , width: width * 0.3}}
                    contentStyle={{ paddingVertical: 5 }}
                    onPress={() => {}}
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                >
                    <Text style={{color: '#FFFFFF'}}>Upload</Text>
                </Button>

                {/* Picure Preview */}
                {(picture.uri == "") ? 
                <View style={styles.noPictureContainer}>
                    <Text style={styles.noPictureText}>No Image</Text>
                </View>
                :
                <View style={styles.pictureContainer}>
                    {/* Image */}
                    <TouchableOpacity style={styles.removePictureContainer} onPress={() => {setPicture({uri:""})}}>
                        <AntDesign name="close" color="#FFFFFF"/>
                    </TouchableOpacity>
                </View>
                }
                
                {/* Description */}
                <TextInput
                    mode="outlined"
                    label="Description (Max 80 Character)"
                    style={{ marginTop: 20 }}
                    placeholder="Enter your description (Max 80 Character)"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={5}
                    maxLength={80}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    autoCapitalize="sentences"
                    returnKeyType="done"
                    blurOnSubmit={false}
                    left={<TextInput.Icon name="pencil" color={description ? '#7289DA' : '#BABBBF'} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <View style={styles.buttonContainer}>
                    <Button
                        mode="outlined"
                        style={{ marginTop: 10, marginBottom: 10, borderRadius: 10 , width: width * 0.35, backgroundColor: '#424549', borderWidth:2, borderColor: '#7289DA'}}
                        contentStyle={{ paddingVertical: 5 }}
                        onPress={() => navigation.goBack()}
                        theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                    >
                        <Text style={{color: '#FFFFFF'}}>Cancel</Text>
                    </Button>

                    <Button
                        mode="contained"
                        style={{ marginTop: 10, marginBottom: 10, borderRadius: 10 , width: width * 0.35}}
                        contentStyle={{ paddingVertical: 5 }}
                        onPress={updateProfile}
                        loading={isUpdateLoading}
                        disabled={isUpdateLoading}
                        theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                    >
                        <Text style={{color: '#FFFFFF'}}>Save</Text>
                    </Button>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen:{
        paddingTop: 0.01 * height,
        paddingBottom: 0.01 * height,
        paddingHorizontal: 0.05 * width,
        flex: 1,
        backgroundColor: '#282b30',
    },
    screenScroll:{
        paddingBottom: 20, 
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 30,
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingBottom: 10,
        color: '#7289DA',
    },
    labelText: {
        fontSize: 16,
        paddingTop: 20,
        color: '#FFFFFF',
    },
    noPictureContainer:{
        width: width * 0.3,
        height: height * 0.05,
        borderWidth: 2,
        borderColor: '#72767D',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    noPictureText: {
        fontSize: 14,
        color: '#72767D',
    },
    pictureContainer:{
        width: width * 0.5,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: '#72767D',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    removePictureContainer:{
        position: 'absolute',
        top: 2,
        right: 2,
        width: width * 0.1,
        aspectRatio: 1,
        borderRadius: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000aa',
      },
    buttonContainer:{
        width: width * 0.8,
        height: height * 0.1,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: 'yellow',
    },
});

export default EditProfileScreen;