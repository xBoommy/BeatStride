import React, { useState, useEffect } from 'react';
import {  Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation, CommonActions } from '@react-navigation/native'; 
import * as Location from 'expo-location';
import { Button } from "react-native-paper";

import ExerciseComponentStyles from './ExerciseComponentStyles';
import PreRunSelection from '../PreRunSelection';
import color from '../../../constants/color';
import textStyle from '../../../constants/textStyle';

const {width} = Dimensions.get("window")

const BasicRun = () => {
    const navigation = useNavigation();

    const [status, setStatus] = useState(0);
    const [selectionToggle, setSelectionToggle] = useState(false);

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

    return (
        <View style={ExerciseComponentStyles.containerBuffer}>
            <View style={ExerciseComponentStyles.componentContainer}>
                <PreRunSelection
                    isTempo={false}
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
                            width: width-20-40,
                            height: 250,
                            borderRadius: 15,
                            backgroundColor: "white",
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>

                            {/* Total Distance Indicator */}
                            <View style={{alignItems: 'center', paddingTop:20}}>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 5}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 50}}>45.2</Text>
                                    <Text style={{...textStyle.subHeader, fontWeight: 'bold',}}> m</Text>
                                </View>
                                <Text style={textStyle.subHeader}>Total Distance</Text>
                            </View>

                            {/* Total Runs Indicator */}
                            <View style={{alignItems: 'center', paddingTop:20 }}>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 5}}>
                                    <Text style={{fontWeight: 'bold', ...textStyle.header}}>3</Text>
                                    <Text style={{fontWeight: 'bold',}}> runs</Text>
                                </View>
                                <Text style={textStyle.subHeader}>Total Runs</Text>
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
export default BasicRun