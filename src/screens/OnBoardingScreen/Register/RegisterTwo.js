import React, { useState, useRef, useContext } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, Dimensions, Pressable, Keyboard } from 'react-native';
import { Button, TextInput, IconButton } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import DropDown from "react-native-paper-dropdown";

import * as Firestore from '../../../api/firestore';

import Screen from '../../../constants/screen';
import color from '../../../constants/color';

const {width, height} = Dimensions.get("window")

const RegisterTwo = ({navigation, route}) => {
    const uid = route.params.uid;
    const displayName = route.params.displayName;

    const [picture, setPicture] = useState({})
    const [age, setAge] = useState();


    const [showGenderDropDown, setShowGenderDropDown] = useState(false); 
    const [gender, setGender] = useState('');
    const genderList = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Others", value: "Others" },
    ];

    const [showRegionDropDown, setShowRegionDropDown] = useState(false);
    const [region, setRegion] = useState('');
    const RegionList = [
      { label: "North", value: "North" },
      { label: "South", value: "South" },
      { label: "East", value: "East" },
      { label: "West", value: "West" },
  ];

    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    
    /* [Store user data into database] 
    Upon success => navigate user to main page*/
    const profileHandler = () =>{
        Keyboard.dismiss();
        setIsRegisterLoading(true);

        const credentials = {
            displayName: displayName,
            uid: uid,
            age: age,
            gender: gender,
            region: region,
            events: [],
            totalDistance: 0,
            runCount: 0,
        }
    
        Firestore.db_createAccount(credentials,
            ()=>{
                console.log('registration complete')
                navigation.dispatch(CommonActions.reset({ 
                    index: 0, 
                    routes: [{ name: "AppTab" }] 
                }))
            },
            () =>{
                console.log('registration failed')
                setIsRegisterLoading(false);
            }    
        )
    }

    return (
        <Screen scrollable>
          
            <Text style={styles.subtitle}>Set up your Profile!</Text>

            {/* Imagepicker to take/upload profile picture */}
            <View style={{width: 0.9 * width, alignItems:'center', paddingVertical: 0.01 * height}}> 
                <View style={{
                  backgroundColor: color.primary,
                  width: 0.15 * height,
                  height: 0.15 * height,
                  borderRadius: height,
                }}>

                </View>
                <Text style={{color: color.secondary, paddingTop: 0.01 * height}}>Profile Picture</Text>
            </View>
            
            {/* Age input */}
            <TextInput
                mode="outlined"
                label="Age"
                keyboardType="number-pad"
                style={{ marginTop: 10, marginBottom: 10}}
                placeholder="Enter your Age"
                value={age}
                onChangeText={setAge}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {Keyboard.dismiss()}}
                blurOnSubmit={false}
                left={<TextInput.Icon name="slack" color={age ? color.primary : color.secondary} />}
                theme={{ colors: { primary: color.primary, underlineColor:'transparent',}}}
            />

            {/* Gender input */}
            <View style={{ marginTop: 10, marginBottom: 10}}>
                <DropDown
                    mode="outlined"
                    label="Gender"
                    placeholder="-Select-"
                    value={gender}
                    setValue={setGender}
                    list={genderList}
                    visible={showGenderDropDown}
                    showDropDown={() => {
                        setShowGenderDropDown(true);
                        Keyboard.dismiss();
                    }}
                    onDismiss={() => setShowGenderDropDown(false)}
                    dropDownStyle={{marginTop: 0.05 * height}}
                    blurOnSubmit={false}
                    inputProps={{
                      left: <TextInput.Icon name="gender-male-female" color={gender ? color.primary : color.secondary} />,
                      right: <TextInput.Icon name={"menu-down"} />
                    }}
                    activeColor={color.primary}
                />
            </View>
            
            {/* Region Input */}
            <View style={{ marginTop: 10, marginBottom: 10}}>
                <DropDown
                    mode="outlined"
                    label="Region"
                    placeholder="-Select-"
                    value={region}
                    setValue={setRegion}
                    list={RegionList}
                    visible={showRegionDropDown}
                    showDropDown={() => {
                        setShowRegionDropDown(true);
                        Keyboard.dismiss();
                    }}
                    onDismiss={() => setShowRegionDropDown(false)}
                    dropDownStyle={{marginTop: 0.05 * height}}
                    inputProps={{
                      left:<TextInput.Icon name="map" color={region ? color.primary : color.secondary} />,
                      right: <TextInput.Icon name={"menu-down"} />
                    }}
                    activeColor={color.primary}
                />
                <Text style={{ color: color.secondary, paddingHorizontal: 10, paddingTop: 10 }}>
                    {/* NEED TO EDIT */}
                    Your region would be the focus of your community contributions. This can be edited in your profile at a later time.
                </Text>
            </View>          
            

            {/* Set profile button */}
            <Button
                mode="contained"
                style={{ marginTop: 20, borderRadius: 10 }}
                contentStyle={{ paddingVertical: 5 }}
                onPress={profileHandler}
                loading={isRegisterLoading}
                disabled={isRegisterLoading}
                theme={{ colors: { primary: color.primary, underlineColor:'transparent',}}}
            >
                <Text style={{color: '#FFFFFF'}}>Set Profile</Text>
            </Button>

            <Button
                mode="outlined"
                style={{ marginTop: 20, borderRadius: 10 }}
                contentStyle={{ paddingVertical: 5 }}
                onPress={() => 
                  navigation.dispatch(CommonActions.reset({ 
                    index: 0, 
                    routes: [{ name: "LoginScreen" }]
                  }))
                }
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
});