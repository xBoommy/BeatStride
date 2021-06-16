import React, { useState, useRef, useContext } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, Dimensions, Keyboard, Image } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

import * as Authentication from "../../api/auth";

import Screen from '../../constants/screen';
import color from '../../constants/color';

const {width, height} = Dimensions.get('window');

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
                <IconButton icon="run" style={{ margin: 0 }} color={color.secondary} />
                <Text style={{ fontSize: 16, color: color.secondary }}>Maple_EXP</Text>
            </View>

            <View style={{alignItems:'center',}}>
                <View style={{height: 0.265 * height, width: 0.7 * width, alignItems: 'center'}}>
                  <Image source={require('../../assets/icons/Logo.png')} style={{height: 0.3 * height, width: 0.75 * width}}/>
                </View>
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
                left={<TextInput.Icon name="at" color={email ? color.primary : color.secondary} />}
                theme={{ colors: { primary: color.primary, underlineColor:'transparent',}}}
            />

            <TextInput
                ref={passwordTextInput}
                mode="outlined"
                label="Password"
                style={{ marginTop: 10 }}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                left={<TextInput.Icon name="form-textbox-password" color={password ? color.primary : color.secondary} />}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                right={<TextInput.Icon name={isPasswordVisible ? "eye-off" : "eye"} onPress={() => setIsPasswordVisible((state) => !state)} />}
                theme={{ colors: { primary: color.primary, underlineColor:'transparent',}}}
            />
            <Button
                mode="contained"
                style={{ marginTop: 20, borderRadius: 10 }}
                contentStyle={{ paddingVertical: 5 }}
                onPress={ handleLogin }
                loading={isLoginLoading}
                disabled={isLoginLoading}
                theme={{ colors: { primary: color.primary, underlineColor:'transparent',}}}
            >
              <Text style={{color: '#FFFFFF'}}>Log in</Text>
            </Button>

            <Button
                mode="outlined"
                style={{ marginTop: 20, borderRadius: 10 }}
                contentStyle={{ paddingVertical: 5 }}
                onPress={() => navigation.navigate("RegisterOne")}
                theme={{ colors: { primary: color.primary, underlineColor:'transparent',}}}
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