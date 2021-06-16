import React, { useState, useEffect } from 'react';
import {  SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
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
        <EndRun positions={positions} />
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <View
            style={{
              width: 0.9 * Dimensions.get('window').width,
              height: 0.7 * Dimensions.get('window').height,
              padding: 0.1 * Dimensions.get('window').height,
              backgroundColor: '#FFFFFF',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 55}}>Run</Text>
              <Text style={{fontSize: 30}}>Concluded</Text>
            </View>
            <Button
              title={'Done'}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'AppTab'}],
                  }),
                );
              }}
            />
          </View>
        </View>
        {/* <Text>{message}</Text>
            <Text>Day: {day}</Text>
            <Text>Date: {date}</Text>
            <Text>Time Started: {time}</Text>
            <Text>Distance: {distance}</Text>
            <Text>Steps: {steps}</Text>
            <Text>Duration: {duration}</Text> */}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    overallContainer:{
        flex: 1,
    },
})
export default RunEnd