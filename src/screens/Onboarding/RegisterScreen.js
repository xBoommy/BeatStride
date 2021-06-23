import React, { useState, useRef, useContext } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable, Keyboard, Dimensions } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import moment from 'moment';

import * as Authentication from '../../api/auth';
import * as Firestore from '../../api/firestore';

const {width, height} = Dimensions.get('window');

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const emailTextInput = useRef();
    const passwordTextInput = useRef();

    const handleRegister = () => {
        Keyboard.dismiss();
        setIsRegisterLoading(true);
    
        Authentication.createAccount(
            { name: username, email, password },
            (user) => {

                const Credentials = {
                    displayName: user.displayName,
                    uid: user.uid,
                    totalDistance: 0,
                    runCount: 0,
                    goalDistance: 0,
                    goalTime: 0,
                    strideDistance: 0,
                    joinDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
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
          },
          (error) => {
            setIsRegisterLoading(false);
            return console.error(error);
          }
        );
    }

    //Temp
    const goToRegisterTwo = () => {
        navigation.navigate('RegisterTwo');
    }
    
    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.screenScroll} keyboardShouldPersistTaps="always">

                <Text style={styles.title}>Run to the beat of your drums!</Text>
                <Text style={styles.subtitle}>Create your account</Text>

                <TextInput
                    mode="outlined"
                    label="Username"
                    style={{ marginTop: 10 }}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
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
                    right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} color="#7289DA" onPress={() => setIsPasswordVisible((state) => !state)} />}
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
    paddingTop: 20,
    paddingBottom: 10,
    color: '#FFFFFF',
  },

  link: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#7289DA',
  },
});