import React, { useState, useRef, useContext } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable, Keyboard } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';

import * as Authentication from "../api/auth";
import Screen from '../constants/screen';
import { placeholder } from '@babel/types';

const RegisterTwo = props => {
    const username = props.route.params?.username ?? '';
    const email = props.route.params?.email ?? '';
    const password = props.route.params?.password ?? '';

    const [gender, setGender] = useState('');
    const genderOptions = [{label: 'Female', value: 'Female'}, {label: 'Male', value: 'Male'}, {label: 'Others', value: 'Others'}];
    const [region, setRegion] = useState('');
    const regionOptions = [{label: 'North', value: 'North'}, {label: 'South', value: 'South'}, {label: 'East', value: 'East'}, {label: 'West', value: 'West'}];

    const [name, setName] = useState("");
    const [age, setAge] = useState();
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
            props.navigation.dispatch(CommonActions.reset({ 
                index: 0, 
                routes: [{ name: "AppTab" }]
            }))
          },
          (error) => {
            setIsRegisterLoading(false);
            return console.error(error);
          }
        );
    }
    
    return (
        <Screen scrollable>
          {/* Imagepicker to take/upload profile picture */}
            <TextInput
                mode="outlined"
                label="Full Name"
                style={{ marginTop: 10 }}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailTextInput.current.focus()}
                blurOnSubmit={false}
                left={<TextInput.Icon name="account" color={username ? "#e32f45" : "#748c94"} />}
                theme={{ colors: { primary: "#e32f45",underlineColor:'transparent',}}}
            />

            <TextInput
                ref={emailTextInput}
                mode="outlined"
                label="Age"
                keyboardType="number-pad"
                style={{ marginTop: 10, marginBottom: 10}}
                placeholder="Enter your Age"
                value={age}
                onChangeText={setAge}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordTextInput.current.focus()}
                blurOnSubmit={false}
                left={<TextInput.Icon name="slack" color={email ? "#e32f45" : "#748c94"} />}
                theme={{ colors: { primary: "#e32f45",underlineColor:'transparent',}}}
            />

            <Text>Select Your Gender:</Text>
            <View style={styles.picker}>
            <Picker selectedValue={gender} onValueChange={(itemValue, itemId) => setGender(itemValue)} prompt="Select Your Gender">
                <Picker.Item label="-" value="-" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Others" value="Others" />
            </Picker>
            </View>

            <Text>Select Your Region:</Text>
            <View style={styles.picker}>
            <Picker selectedValue={gender} onValueChange={(itemValue, itemId) => setRegion(itemValue)} prompt="Select Your Region">
                <Picker.Item label="-" value="-" />
                <Picker.Item label="North" value="North" />
                <Picker.Item label="South" value="South" />
                <Picker.Item label="East" value="East" />
                <Picker.Item label="West" value="West" />
            </Picker>
            </View>


            <Button
                mode="contained"
                style={{ marginTop: 20, borderRadius: 10 }}
                contentStyle={{ paddingVertical: 5 }}
                onPress={handleRegister}
                loading={isRegisterLoading}
                disabled={isRegisterLoading}
                theme={{ colors: { primary: "#e32f45",underlineColor:'transparent',}}}
            >Create account</Button>

            <Text style={{ color: "#748c94", paddingHorizontal: 10, paddingTop: 10 }}>
                By proceeding and tapping on Create Account, you agree to Simplist's Terms of Service and Privacy Policy.
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
                style={{ marginTop: 20, borderRadius: 10 }}
                contentStyle={{ paddingVertical: 5 }}
                onPress={() => navigation.goBack()}
                icon="arrow-left"
                theme={{ colors: { primary: "#e32f45",underlineColor:'transparent',}}}
            >Log in instead</Button>
        </Screen>
    )
}
export default RegisterTwo;

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingTop: 30,
  },

  subtitle: {
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },

  link: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#748c94',
  },

  picker: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  }
});