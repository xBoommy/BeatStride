import React, { useState, useRef, useEffect } from 'react';
import {  Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Animated } from 'react-native';

import * as LocationLib from '../../api/LocationPermissions';

import TempoRun from './MainTabs/TempoRun';
import BasicRun from './MainTabs/BasicRun';
import RunHistory from './MainTabs/RunHistory';

const {width, height} = Dimensions.get("window")

const ExerciseMain = ({navigation}) => {
    const [permissionsStatus, setPermissionsStatus] = useState(3);
    
    /* */
    const forePermissionHandler = () => {
        LocationLib.forePermissionCheck(() => {
            setPermissionsStatus(1);
        })
    } 

    const backPermissionHandler = () => {
        LocationLib.backPermissionCheck(() => {
            setPermissionsStatus(2);
        })
    } 

    useEffect(() => {
        if (permissionsStatus === 0) {
            console.log ('P_Status : 0 - FOREGROUND:not granted / BACKGROUND:not granted')
            forePermissionHandler()
        }
        if (permissionsStatus === 1) {
            console.log ('P_Status : 1 - FOREGROUND:granted / BACKGROUND:not granted')
            backPermissionHandler()
        }
        if (permissionsStatus === 2) {
            console.log ('P_Status : 2 - FOREGROUND:granted / BACKGROUND:granted')
        }
        if (permissionsStatus === 3) {
            setPermissionsStatus(0)
            console.log('P_Status : 3 - App Start')
        }
    }, [permissionsStatus])

    
    /*  */
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={styles.screenStyle}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Exercise</Text>
            </View>
            
            <Animated.ScrollView 
                horizontal 
                pagingEnabled={true}
                snapToInterval={width} 
                decelerationRate='fast'
                showsHorizontalScrollIndicator={false}
                bounces={false}
                overScrollMode='never'
                disableIntervalMomentum={true}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                    )}
                style={styles.mainComponentContainer}>
                
                {/* Run components */}
                <View  style={styles.componentContainer}>
                    {/* <TempoRun/> */}
                    <BasicRun/>
                    <RunHistory/>
                </View>
                

            </Animated.ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenStyle:{
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',
    },
    headerContainer:{
        // backgroundColor: 'pink',
        width: width
    },
    headerText:{
        fontSize: 0.04 * height,
        fontWeight: 'bold',
        padding: 5,
    },
    mainComponentContainer:{
        // backgroundColor: 'pink',
        position: 'absolute',
        width: width,
        height: 0.75 * height,
        bottom: 0.15 * height,
    },
    componentContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default ExerciseMain