import React, { useState, useEffect } from 'react';
import {  Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation, CommonActions } from '@react-navigation/native'; 
import * as Location from 'expo-location';

import ExerciseComponentStyles from './ExerciseComponentStyles';

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
            navigation.navigate("RunningMain")
        }
        if (status === 6) {
            console.log("Checking GPS Service")
            seviceCheck();
        }
    },[status])
    
    return (
        <View style={ExerciseComponentStyles.containerBuffer}>
            <View style={ExerciseComponentStyles.componentContainer}>

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
                    <Text>TempoRun</Text>

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