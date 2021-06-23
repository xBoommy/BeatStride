import React, { useState, useRef, useContext } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, Dimensions, Keyboard, Image, ScrollView, Alert } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

import * as Authentication from "../../api/auth";

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
                Alert.alert(
                  "Invalid Email",
                  "Please ensure that the email you've entered is valid.",
                  [ { text:"Understood", onPress: () => {} } ]
                )
            };
            if (error.code === 'auth/user-not-found') {
                // setMessage('Incorrect Email. There is no account linked to the email')
                Alert.alert(
                  "User Not Found",
                  "Please ensure that you have an account associated with the email.",
                  [ { text:"Understood", onPress: () => {} } ]
                )
            };
            if (error.code === 'auth/wrong-password'){
                // setMessage('Incorrect Password. The password you entered is incorrect')
                Alert.alert(
                  "Incorrect Password",
                  "The password you entered is incorrect.",
                  [ { text:"Understood", onPress: () => {} } ]
                )
            };
            return console.error(error);
          }
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
          <ScrollView contentContainerStyle={styles.screenScroll} keyboardShouldPersistTaps="always">

              <View style={styles.brand}>
                  <IconButton icon="run" style={{ margin: 0 }} color={'#BABBBF'} />
                  <Text style={{ fontSize: 16, color: '#BABBBF' }}>Beat Stride</Text>
              </View>

              <View style={{alignItems:'center',}}>
                  <View style={{height: 170, width: 250, alignItems: 'center'}}>
                    <Image source={require('../../assets/icons/Logo.png')} style={{height: 200, width: 250}}/>
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
                  left={<TextInput.Icon name="at" color={email ? '#7289DA' : '#BABBBF'} />}
                  theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#FFFFFF', underlineColor: 'transparent', background: '#4F535C'},}}
              />

              <TextInput
                  ref={passwordTextInput}
                  mode="outlined"
                  label="Password"
                  style={{ marginTop: 10 }}
                  placeholder="Enter your password"
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
                  onPress={ handleLogin }
                  loading={isLoginLoading}
                  disabled={isLoginLoading}
                  theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
              >
                <Text style={{color: '#FFFFFF'}}>Log in</Text>
              </Button>

              <Button
                  mode="outlined"
                  style={{ marginTop: 20, borderRadius: 10, backgroundColor: '#424549', }}
                  contentStyle={{ paddingVertical: 5 }}
                  onPress={() => navigation.navigate("RegisterScreen")}
                  theme={{ dark: true, colors: { primary: '#7289DA', underlineColor:'transparent',} }}
              >Create an account</Button>

          </ScrollView>
        </SafeAreaView>
    );
}
export default LoginScreen;

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
    color: '#FFFFFF'
  },

  forgotPasswordLink: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#4f5b62',
  },
});