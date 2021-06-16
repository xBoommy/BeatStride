import React, { useState, useEffect } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import {  CommonActions } from '@react-navigation/native'; 
import moment from 'moment';

import EndRun from './EndMap';

const RunEnd = ({navigation, route}) => {           
    const message = route.params.message        //message
    const distance = route.params.distance;     //Total Distance Ran
    const steps = route.params.steps;           //Total Steps
    const positions = route.params.positions;   //Array of Positions Travelled
    const duration = route.params.duration;     //Total Run Duration
    const time = route.params.time;             //Start Time of Run
    const day = route.params.day;               //Start Time of Run
    const date = route.params.date;             //Start Time of Run
 
    return (
        <SafeAreaView style={styles.overallContainer}>
            <EndRun
                positions={positions}
            />
            <Text>{message}</Text>
            <Text>Day: {day}</Text>
            <Text>Date: {date}</Text>
            <Text>Time Started: {time}</Text>
            <Text>Distance: {distance}</Text>
            <Text>Steps: {steps}</Text>
            <Text>Duration: {duration}</Text>
            <Button 
                title={"Done"}
                onPress={ () =>{
                    navigation.dispatch(CommonActions.reset({ 
                        index: 0, 
                        routes: [{ name: "AppTab" }] 
                    }))
                }
                    
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    overallContainer:{
        flex: 1,
    },
})
export default RunEnd