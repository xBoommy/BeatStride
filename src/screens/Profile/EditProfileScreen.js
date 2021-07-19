import React, { useState, useRef, useContext, useEffect } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Keyboard, Dimensions, Image, Alert } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Firestore from '../../api/firestore';
import * as ImagePicker from 'expo-image-picker';

const {width, height} = Dimensions.get('window');

const EditProfileScreen = ({navigation, route}) => {
    const userData = route.params.userData;
    const [username, setUsername] = useState(userData.displayName);
    const [description, setDescription] = useState(userData.description);
    const [displayPicture, setDisplayPicture] = useState({uri: ""});
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const usernameTextInput = useRef();

    const updateProfile = () => {
        Keyboard.dismiss();
        setIsUpdateLoading(true);

        if (username == "") {
            setIsUpdateLoading(false);
            Alert.alert(
                "Invalid Username",
                "Username field cannot be left blank.",
                [ { text:"Understood", onPress: () => {usernameTextInput.current.focus()} } ]
            )
        } else {
            Firestore.db_updateProfile(
                {displayName: username, description: description},
                () => {
                    if (displayPicture.uri != "") {
                        Firestore.storage_uploadProfilePic(displayPicture.uri);
                    } else {
                        Firestore.storage_removeProfilePic();
                    }
                    setIsUpdateLoading(false);
                    navigation.goBack();
                    //navigation.navigate("AppTab", {screen: "ProfileScreen"});
                },
                () => {
                    setIsUpdateLoading(false);
                    return console.error(error);
                },
            )
        }
    }

    useEffect(() => {
        Firestore.storage_retrieveOtherProfilePic(userData.uid, setDisplayPicture, () => setDisplayPicture({uri: ""}));
    }, []);

    const uploadProfilePic = async () => {

        let results = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [2, 2],
          quality: 0.8,
        })

        if (!results.cancelled) {
            //console.log('Image location/uri: ');
            //console.log(results.uri);
            setDisplayPicture({uri: results.uri});
        }
    };

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
                    ref={usernameTextInput}
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
                    onPress={uploadProfilePic}
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                >
                    <Text style={{color: '#FFFFFF'}}>Upload</Text>
                </Button>

                {/* Picure Preview */}
                {(displayPicture.uri == "") ? 
                <View style={styles.noPictureContainer}>
                    <Text style={styles.noPictureText}>No Image</Text>
                </View>
                :
                <View style={styles.pictureContainer}>
                    {/* Image */}
                    <Image style={styles.pictureContainer} source={displayPicture} />
                    <TouchableOpacity style={styles.removePictureContainer} onPress={() => {setDisplayPicture({uri:""})}}>
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

                <Button
                    mode="outlined"
                    style={{ marginTop: 20, marginBottom: 10, borderRadius: 10 , width: width * 0.8,  backgroundColor: '#424549', borderWidth:2, borderColor: '#7289DA'}}
                    contentStyle={{ paddingVertical: 5 }}
                    onPress={() => {navigation.navigate("ChangePasswordScreen")}}
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                >
                    <Text style={{color: '#FFFFFF'}}>Change Password</Text>
                </Button>

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
        // marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: 'yellow',
    },
});

export default EditProfileScreen;