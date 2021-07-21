import React, { useState, useRef, useContext } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable, Keyboard, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';

import * as Authentication from '../../api/auth';
import * as Firestore from '../../api/firestore';

const {width, height} = Dimensions.get('window');

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [description, setDescription] = useState("");
    const [displayPicture, setDisplayPicture] = useState({uri: ""});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPassword2Visible, setIsPassword2Visible] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const usernameTextInput = useRef();
    const emailTextInput = useRef();
    const passwordTextInput = useRef();
    const password2TextInput = useRef();

    const handleRegister = () => {
        Keyboard.dismiss();
        setIsRegisterLoading(true);

        if (username == "") {
            setIsRegisterLoading(false);
            usernameTextInput.current.focus()
        } else if (email == "") {
            setIsRegisterLoading(false);
            emailTextInput.current.focus()
        } else if (password == "") {
            setIsRegisterLoading(false);
            passwordTextInput.current.focus()
        } else if (password2 == "") {
            setIsRegisterLoading(false);
            password2TextInput.current.focus()
        }  else if (password != password2) {
            setIsRegisterLoading(false);
            Alert.alert(
                "Passwords Do Not Match",
                "Please ensure that the passwords you've entered matches.",
                [ { text:"Understood", onPress: () => {password2TextInput.current.focus()} } ]
            )
        } else {
            Authentication.createAccount(
                { name: username, email, password },
                (user) => {

                    const Credentials = {
                        displayName: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        totalDistance: 0,
                        runCount: 0,
                        goalDistance: 0,
                        goalTime: 0,
                        strideDistance: 0,
                        longestDistance: 0,
                        fastestPace: 0,
                        joinDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
                        description: description,
                    }

                    Firestore.db_createAccount(Credentials, 
                        () => {
                            navigation.dispatch(CommonActions.reset({ 
                                index: 0, 
                                routes: [{ name: "GuideScreen" }]
                            }))
                        },
                        () => {
                            console.log('registration failed')
                            setIsRegisterLoading(false);
                        },
                    )

                    if (displayPicture.uri !== "") {
                        Firestore.storage_newUserUploadProfilePic(user.uid, displayPicture.uri);
                    }
            },
            (error) => {
                setIsRegisterLoading(false);

                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                    "Email Already In-use",
                    "The email you've entered is already in-use. Please use another email.",
                    [ { text:"Understood", onPress: () => {emailTextInput.current.focus()} } ]
                    )
                };
                if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                    "Invalid Email",
                    "Please ensure that the email you've entered is valid.",
                    [ { text:"Understood", onPress: () => {emailTextInput.current.focus()} } ]
                    )
                };
                if (error.code === 'auth/operation-not-allowed') {
                    Alert.alert(
                    "System Unavailable",
                    "Creation of account is disabled at the moment. Please try again after a moment",
                    [ { text:"Understood", onPress: () => {} } ]
                    )
                };
                if (error.code === 'auth/weak-password') {
                    Alert.alert(
                    "Weak Password",
                    "Please ensure that the password you've entered meets the minimum requirements",
                    [ { text:"Understood", onPress: () => {passwordTextInput.current.focus()} } ]
                    )
                }; 
                return console.error(error);
            }
            );
        }
        
    };

    const uploadProfilePic = async () => {

        let results = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [2, 2],
          quality: 0.8,
        })

        if (!results.cancelled) {
            console.log('Image location/uri: ');
            console.log(results.uri);
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

                <Text style={styles.title}>Run to the beat of your drums!</Text>
                <Text style={styles.subtitle}>Create your account</Text>

                <TextInput
                    ref={usernameTextInput}
                    mode="outlined"
                    label="Username"
                    style={{ marginTop: 10 }}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    maxLength={12}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => emailTextInput.current.focus()}
                    blurOnSubmit={false}
                    left={<TextInput.Icon name="account" color={username ? '#7289DA' : '#BABBBF'} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <TextInput
                    ref={emailTextInput}
                    mode="outlined"
                    label="Email address"
                    keyboardType="email-address"
                    style={{ marginTop: 10 }}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordTextInput.current.focus()}
                    blurOnSubmit={false}
                    left={<TextInput.Icon name="at" color={email ? '#7289DA' : '#BABBBF'} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <TextInput
                    ref={passwordTextInput}
                    mode="outlined"
                    label="Password"
                    style={{ marginTop: 10 }}
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChangeText={setPassword}
                    left={<TextInput.Icon name="form-textbox-password" color={password ? '#7289DA' : '#BABBBF'} />}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    onSubmitEditing={() => password2TextInput.current.focus()}
                    right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsPasswordVisible((state) => !state)} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <TextInput
                    ref={password2TextInput}
                    mode="outlined"
                    label="Re-enter Password"
                    style={{ marginTop: 10 }}
                    placeholder="Re-enter your password"
                    value={password2}
                    onChangeText={setPassword2}
                    left={<TextInput.Icon name="form-textbox-password" color={password2 ? '#7289DA' : '#BABBBF'} />}
                    secureTextEntry={!isPassword2Visible}
                    autoCapitalize="none"
                    right={<TextInput.Icon name={isPassword2Visible ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsPassword2Visible((state) => !state)} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <Text style={styles.passwordWarningText}>
                    { (password2 == "") ? "" : ((password === password2) ? "Passwords Match" : "Passwords DO NOT Match")}
                </Text>

                <Text style={styles.subtitle}>Setup your profile</Text>

                <Text style={styles.labelText}>Profile picture (Optional)</Text>

                <Button
                    mode="contained"
                    style={{ marginTop: 10, marginBottom: 10, borderRadius: 10 , width: width * 0.3}}
                    contentStyle={{ paddingVertical: 5 }}
                    onPress={ uploadProfilePic }
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                >
                    <Text style={{color: '#FFFFFF'}}>Upload</Text>
                </Button>

                {(displayPicture.uri == "") ? 
                <View style={styles.noPictureContainer}>
                    <Text style={styles.noPictureText}>No Image</Text>
                </View>
                :
                <View style={styles.pictureContainer}>
                    <Image style={styles.pictureContainer} source={displayPicture} />
                    <TouchableOpacity style={styles.removePictureContainer} onPress={() => {setDisplayPicture({uri:""})}}>
                        <AntDesign name="close" color="#FFFFFF"/>
                    </TouchableOpacity>
                </View>
                }
                
                <TextInput
                    mode="outlined"
                    label="Description (Optional)"
                    style={{ marginTop: 30 }}
                    placeholder="Enter your description (Max 80 Character, 5 Lines)"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={5}
                    maxLength={80}
                    autoCapitalize="sentences"
                    returnKeyType="done"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    blurOnSubmit={false}
                    left={<TextInput.Icon name="pencil" color={description ? '#7289DA' : '#BABBBF'} />}
                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
                />

                <Button
                    mode="contained"
                    style={{ marginTop: 20, borderRadius: 10 }}
                    contentStyle={{ paddingVertical: 5 }}
                    onPress={handleRegister}
                    loading={isRegisterLoading}
                    disabled={isRegisterLoading}
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                >
                    <Text style={{color: '#FFFFFF'}}>Create Account</Text>
                </Button>

                <Text style={{ color: '#BABBBF', paddingHorizontal: 10, paddingTop: 10 }}>
                    By proceeding and tapping on Create Account, you agree to BeatStride's Terms of Service and Privacy Policy.
                </Text>

                <Pressable onPress={() => {
                    //Privacy policy popup?
                }}>
                    <Text style={styles.link}>Privacy policy</Text>
                </Pressable>

                <Pressable onPress={() => {
                    //Terms of Service popup?
                }}>
                    <Text style={styles.link}>Terms of Service</Text>
                </Pressable>

                <Button
                    mode="outlined"
                    style={{ marginTop: 20, borderRadius: 10, backgroundColor: '#424549', }}
                    contentStyle={{ paddingVertical: 5 }}
                    onPress={() => navigation.goBack()}
                    icon="arrow-left"
                    theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
                >Log in instead</Button>
            </ScrollView>
        </SafeAreaView>
    )
}
export default RegisterScreen;

const styles = StyleSheet.create({
  screen:{
    paddingTop: 0.01 * height,
    paddingBottom: 0.01 * height,
    paddingHorizontal: 0.05 * width,
    flex: 1,
    backgroundColor: '#282B30',
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
  passwordWarningText:{
    fontSize: 14,
    paddingTop: 10,
    // textDecorationLine: 'underline',
    color: '#7289DA',
  },
  labelText: {
    fontSize: 16,
    paddingTop: 10,
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
  link: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#7289DA',
  },
});