import React, { useState, useEffect } from 'react';
import {  Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation, CommonActions } from '@react-navigation/native'; 
import * as Location from 'expo-location';
import { Button } from "react-native-paper";

import color from '../../../constants/color';

import ExerciseComponentStyles from './ExerciseComponentStyles';
import PreRunSelection from '../PreRunSelection';

const {width, height} = Dimensions.get("window")

const TempoRun = () => {
    const navigation = useNavigation();

    const [status, setStatus] = useState(0);

    /* [Check GPS Service Enabled? + Prompt] */
    const seviceCheck = async() => {
        const check = await Location.hasServicesEnabledAsync()
        // console.log(check)
        if (check) {
            setStatus(1);
        } else {
            try {
                const pos = await Location.getCurrentPositionAsync();
                if (pos) {
                    setStatus(1);
                }
            } catch(error) {
                console.log(error);
                Alert.alert(
                    "GPS Location Service",
                    "Run function requires GPS Location Service enabled. Please enable GPS Location Service and try again.",
                    [ { text:"Understood", onPress: () => {console.log("Alert closed")} } ]
                )
                setStatus(0);
            }
        }
    }

    /* [Status Control] */
    useEffect(() => {
        if (status === 1) {
            setSelectionToggle(true);
        }
        if (status === 6) {
            console.log("Checking GPS Service")
            seviceCheck();
        }
    },[status])


    const [selectionToggle, setSelectionToggle] = useState(false);

    // GOAL
    const [goalDistance, setGoalDistance] = useState(0);
    const [goalTiming, setGoalTiming] = useState(0);
    
    return (
        <View style={ExerciseComponentStyles.containerBuffer}>
            <View style={ExerciseComponentStyles.componentContainer}>

                <PreRunSelection
                    selectionToggle={selectionToggle}
                    setSelectionToggle={setSelectionToggle}
                />

                {/* Background Map */}
                <View style={ExerciseComponentStyles.mapContainer}>
                    <MapView
                        style={ExerciseComponentStyles.mapStyle}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        region={{
                            latitude: 1.377621,
                            longitude: 103.805178,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                        }}
                    >
                    </MapView>
                </View>

                {/* Section Content */}
                <View style={ExerciseComponentStyles.contentContainer}>
                    <View style={{
                        width: 0.7 * width,
                        height: 0.4 * height,
                        borderRadius: 15,
                        backgroundColor: "#FFFFFF",
                        justifyContent: 'flex-start'
                    }}>

                        {/* Total Distance Indicator */}
                        <View style={{alignItems: 'center', paddingTop: 0.02 * height}}>
                            <View style={{flexDirection: 'row', alignItems: 'flex-end',}}>
                                <Text style={{fontWeight: 'bold', fontSize: 0.07* height}}>110.7</Text>
                                <Text style={{fontWeight: 'bold',}}> km</Text>
                            </View>
                            <Text style={styles.label}>Total Distance</Text>
                        </View>
                        
                        {/* Goals Indicator */}
                        <View style={{alignItems: 'center', paddingTop: 0.02 * height}}>
                            {/* Header */}
                            <Text style={{fontWeight: 'bold', fontSize: 0.025 * height}}>Goals:</Text>

                            {/* Distance */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                // backgroundColor: 'blue',
                                width: 0.5 * width,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Text style={{fontSize: 0.02 * height}}>Distance</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 0.02 * height}}>5 km</Text>
                            </View>

                            {/* Timing */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                // backgroundColor: 'blue',
                                width: 0.5 * width,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Text style={{fontSize: 0.02 * height}}>Timing</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 0.02 * height}}>35 mins</Text>
                            </View>

                            <View style={{alignItems:'center', paddingTop: 0.02 * height, paddingBottom: 0.01 * height}}>
                                <Text style={{fontWeight: 'bold', fontSize: 0.02 * height}}>Recommended Pace</Text>
                                <Text>110 bpm</Text>
                            </View>

                            <Button
                                mode="contained"
                                style={{ borderRadius: 10 }}
                                contentStyle={{backgroundColor: color.primary}}
                                onPress={() => {}}
                                theme={{ colors: { primary: color.primary}}}
                            >
                                <Text style={{color: "#FFFFFF"}}>Edit Goals</Text>
                            </Button>
                            
                        </View>
                    </View>

                    {/* Button */}
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={ExerciseComponentStyles.playButton}
                        onPress={() => { setStatus(6) }}
                    >
                        <View>
                            <Image 
                                source={require('../../../assets/icons/ExercisePlay.png')}
                                resizeMode= 'contain'
                                style={ExerciseComponentStyles.playIcon}
                            />
                        </View>
                    </TouchableOpacity>
                    
                    
                </View>
                
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    
})
export default TempoRun