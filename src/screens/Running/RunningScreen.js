import React from 'react';
import {  SafeAreaView,  ScrollView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity} from 'react-native';

import RunDistance from './components/RunDistance';
import RunTimer from './components/RunTimer';
import RunSteps from './components/RunSteps';
import RunMap from './components/RunMap';
import MusicPlayerRun from './components/MusicPlayerRun';

const {width, height} = Dimensions.get("window")

const RunningScreen = () => {
    return (
        <SafeAreaView style={styles.screen}>

            <View style={styles.contentContainer}>

                {/* Distance */}
                <View style={styles.distanceContainer}>
                    <RunDistance/>
                </View>

                <View style={styles.secondaryDataContainer}>
                    {/* Time */}
                    <View style={styles.timeContainer}>
                        <RunTimer/>
                    </View>
                    {/* Steps */}
                    <View style={styles.stepsContainer}>
                        <RunSteps/>
                    </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>

                    {/* Play button */}
                    <TouchableOpacity style={styles.button}>

                    </TouchableOpacity>

                    {/* Pause button */}
                    <TouchableOpacity style={styles.button}>

                    </TouchableOpacity>

                    {/* Stop button */}
                    <TouchableOpacity style={styles.button}>

                    </TouchableOpacity>

                </View>

            </View>


            {/* Map */}
            <View style={styles.mapContainer}>
                {/* <View style={{width: width * 0.05, aspectRatio: 1, backgroundColor: 'red'}}/> */}
                {/* <RunMap/> */}
            </View>

            {/* Music Player */}
            <View style={styles.musicPlayer}>
                <MusicPlayerRun/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen:{
        width: width,
        height: height,
        backgroundColor: '#282b30',
    },
    contentContainer:{
        width: width,
        height: height * 0.4,
        zIndex: 1,
        paddingTop: height * 0.05,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#282B30',
    },
    distanceContainer:{
        width: width,
        height: height * 0.1,
        // backgroundColor: 'purple',
    },
    secondaryDataContainer:{
        width: width,
        height: height * 0.1,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    timeContainer:{
        width: width * 0.5,
        height: height * 0.1,
        // backgroundColor: 'blue',
    },
    stepsContainer:{
        width: width * 0.5,
        height: height * 0.1,
        // backgroundColor: 'grey',
    },
    buttonContainer:{
        width: width,
        height: height * 0.12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'orange',
    },
    button:{
        height: height * 0.1,
        aspectRatio: 1,
        borderRadius: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7289DA',
    },
    mapContainer:{
        width: width,
        height: height * 0.7,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    musicPlayer:{
        position: 'absolute',
        bottom: height * 0.01,
        alignSelf: 'center',
    },
})

export default RunningScreen;