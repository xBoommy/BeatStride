import React, { useState, useRef, useContext } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, ScrollView, Keyboard } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

//import * as Authentication from "../api/auth";
import Screen from '../constants/screen';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const passwordTextInput = useRef();
    
    const handleLogin = () => {
        Keyboard.dismiss();
        setIsLoginLoading(true);
    
        Authentication.signIn(
          { email, password },
          (user) => {
            navigation.dispatch(CommonActions.reset({ 
                index: 0, 
                routes: [{ name: "AppTab" }] 
            }))
          },
          (error) => {
            setIsLoginLoading(false);
            if (error.code === 'auth/invalid-email') {
                // setMessage('Invalid Email')
            };
            if (error.code === 'auth/user-not-found') {
                // setMessage('Incorrect Email. There is no account linked to the email')
            };
            if (error.code === 'auth/wrong-password'){
                // setMessage('Incorrect Password. The password you entered is incorrect')
            };
            return console.error(error);
          }
        );
    }

    return (
        <Screen scrollable>
            <View style={styles.brand}>
                <IconButton icon="run" style={{ margin: 0 }} color={"#748c94"} />
                <Text style={{ fontSize: 16, color: "#748c94" }}>Maple_EXP</Text>
            </View>

            <View style={{alignItems:'center',}}>
                <View style={{backgroundColor:'red', height:150, width:250}}></View>
            </View>

            <Text style={styles.subtitle}>Welcome!</Text>

            <TextInput
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
                left={<TextInput.Icon name="at" color={email ? "#e32f45" : "#748c94"} />}
                theme={{ colors: { primary: "#e32f45",underlineColor:'transparent',}}}
            />

            <TextInput
                ref={passwordTextInput}
                mode="outlined"
                label="Password"
                style={{ marginTop: 10 }}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                left={<TextInput.Icon name="form-textbox-password" color={password ? "#e32f45" : "#748c94"} />}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} onPress={() => setIsPasswordVisible((state) => !state)} />}
                theme={{ colors: { primary: "#e32f45",underlineColor:'transparent',}}}
            />
            <Button
                mode="contained"
                style={{ marginTop: 20, borderRadius: 10 }}
                contentStyle={{ paddingVertical: 5 }}
                onPress={ handleLogin }
                loading={isLoginLoading}
                disabled={isLoginLoading}
                theme={{ colors: { primary: "#e32f45",underlineColor:'transparent',}}}
            >Log in</Button>

            <Button
                mode="outlined"
                style={{ marginTop: 20, borderRadius: 10 }}
                contentStyle={{ paddingVertical: 5 }}
                onPress={() => navigation.navigate("RegisterOne")}
                theme={{ colors: { primary: "#e32f45",underlineColor:'transparent',}}}
            >Create an account</Button>
        </Screen>
    );
}
export default LoginScreen;

const styles = StyleSheet.create({
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -5,
    marginTop: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingTop: 20,
  },

  subtitle: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  forgotPasswordLink: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#4f5b62',
  },
});