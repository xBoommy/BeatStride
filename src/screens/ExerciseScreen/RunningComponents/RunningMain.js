import React, { useState, useEffect, BackHandler } from 'react';
import {  SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native'; 
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import moment from 'moment';
import * as Firestore from '../../../api/firestore';

import color from '../../../constants/color';

import RunningMap from './RunningMap';
import RunningTimer from './RunningTimer';
import RunningDistance from './RunningDistance';
import RunningSteps from './RunningSteps';
import RunningMusic from './RunningMusic';
import RunningCountdown from './RunningCountdown';

const {width, height} = Dimensions.get("window")

const RunningMain = ({navigation}) => {
    /* [Page Navigation Render] - Triggered upon screen focused  */
    const PageTrigger = navigation.addListener( 'focus', () => {
        getCurrentLocation();
        setRunStatus(1);
    } )

    const [countdown, setCountdown] = useState(true);           //Countdown popup
    const [countdownMsg, setCountdownMsg] = useState("5");      //Countdown message

    const [runStatus, setRunStatus] = useState(0.00);           //Status of activity
    const [promise, setPromise] = useState({});                 //For GPS Subscription Promise

    const [startCoord, setStartCoord] = useState( {latitude: 1.377621, longitude: 103.805178,} );   //Initial coordinate
    const [prevCoord, setPrevCoord] = useState(startCoord);     //Previous coordinate
    const [currCoord, setCurrCoord] = useState(startCoord);     //Current coordinate
    const [positions, setPositions] = useState([startCoord]);   //Array of "valid" positons 
    const [distance, setDistance] = useState(0);

    const [duration, setDuration] = useState(0);    //Total Run Duration
    const [steps, setSteps] = useState(0);          //Total Run Steps

    const [timeStart, setTimeStart] = useState('')      //Start Time of Run
    const [day , setDay] = useState('')                 //Start Day of Run
    const [date, setDate] = useState('')                //Start Date of Run


    /*              /
    /   Functions   /
    /              */

    /* [Get current location] */
    const getCurrentLocation = async() => {
        try {
            const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync()
            console.log('Getting current Location')

            setStartCoord( {latitude: latitude, longitude: longitude} )
            setPrevCoord( {latitude: latitude, longitude: longitude} );
            setCurrCoord( {latitude: latitude, longitude: longitude} );
            setPositions( [{latitude: latitude, longitude: longitude}] );
        } catch (error) {
            console.log(error)
        }
    }

    /* [GPS Subcription countdown] */
    const subcriptionCountdown = () => {
        /* 0 second */
        console.log('Starting in 5');
        getCurrentLocation();
        setCountdownMsg(5);
        setCountdown(true);
        
        /* 1 second */
        setTimeout( () => {
            console.log('Starting in 4');
            setCountdownMsg(4);
            getCurrentLocation();
        }, 1000);
    
        /* 2 second */
        setTimeout( () => {
            console.log('Starting in 3');
            setCountdownMsg(3);
        }, 2000);

        /* 3 second */
        setTimeout( () => {
            console.log('Starting in 2');
            setCountdownMsg(2);
        }, 3000);

        /* 4 second */
        setTimeout( () => {
            console.log('Starting in 1');
            setCountdownMsg(1);
        }, 4000);
    
        /* 5 second */
        setTimeout( () => {
            console.log('Start');
            subscribePosition();
            setRunStatus(2);
            setCountdown(false);
        }, 5000);
    }

    /* [ON GPS Subscription/Tracking] */
    const subscribePosition = async() => {
        const options = {accuracy: 6,  timeInterval: 1000, distanceInterval: 2};

        if ( Location.hasServicesEnabledAsync() ){
            try {
                setPromise( await Location.watchPositionAsync( options, onPositionChange) )
                console.log('GPS Tracking on')
            } catch (error) {
                console.log(error);
            }
        }
    }

    /* [OFF GPS Subscription/Tracking] */
    const unsubscribePosition = () => {
        promise.remove()
        console.log('GPS Tracking off')
    }

    /* [Distance Calculator] */
    const distanceCalculate = (prev_Pos, curr_Pos) => {
        const distGain = geolib.getDistance (prev_Pos, curr_Pos, 0.1)
        console.log('Distance Gained')
        console.log(distGain)
        return distGain;
    }

    /* [Callback function for subscription update] */
    const onPositionChange = (locationObj) => {
        /* Current position from Update */
        const currLat = locationObj.coords.latitude
        const currLong = locationObj.coords.longitude
        const currPos = {latitude: currLat, longitude: currLong}
        setCurrCoord(currPos);
    }

    /* [Position Validation] 
    This checks the distance between the current position & previous position
    Only movement within Limit Range would be taken into consideration of position */
    const positionValidation = () => {
        /* Previous position from current state */
        // console.log("=========position in update==========")
        // console.log(positions)
        const prevPos = positions[positions.length - 1]
        // console.log("prevPos")
        // console.log(prevPos)

        /* Calculate distance change from position update */
        const distGain = distanceCalculate(prevPos, currCoord)

        /* Validation of position update */
        const minGain = 2.5;
        const maxGain= 20;
        if ( (minGain < distGain) && (distGain < maxGain) ) {
            setDistance((prevCurrentDistance) => (Math.round( (prevCurrentDistance + distGain)*100 ))  / 100)
            setPositions( (prevState) => [...prevState, currCoord] );
        }
    }

    

    /*                /
    /     Renders     /
    /                */

    /* [Validation of position movement] 
    This renders after every callback from GPS subscription. It validates movements and update accordingly */
    useEffect(() => {
        positionValidation()
    },[currCoord])


    /* [Coordinates Update] 
    This update occurs whenever Positions Array is udpated(valid movement is made) */
    useEffect(() => {
        /* Ensure that this update is only when running/Prevent override of initial refresh */
        if (runStatus == 2) {
            /* Previous coordinate only updates if there are at least 2 positions in array */
        if (positions.length > 1) {
            setPrevCoord(positions[positions.length - 2])
        }
        setCurrCoord(positions[positions.length - 1])
        }
    }, [positions])

    /* [Run Status Render] 
    This render is triggered upon a change in app status */
    useEffect(() => {
        if (runStatus === 0) {
            console.log("RunStatus - 0: Screen Focus");
            //Record current date & time
            setTimeStart(moment().format('LT'));
            setDay(moment().format('dddd'));
            setDate(moment().format('ll'));
        }
        if (runStatus === 1) {
            console.log("RunStatus - 1: Initializing");
            subcriptionCountdown();
            getCurrentLocation();
        }
        if (runStatus === 2) {
            console.log("RunStatus - 2: Running");
        }
        if (runStatus === 3) {
            console.log("RunStatus - 3: Pause");
            unsubscribePosition();
        }
        if (runStatus === 4) {
            console.log("RunStatus - 4: Stop from Running");
            unsubscribePosition();
            setRunStatus(6);
        }

        if (runStatus === 5) {
            console.log("RunStatus - 5: Stop from Pause");
            setRunStatus(6);
        }
        if (runStatus === 6) {
            console.log("RunStatus - 6: Run End");
            //Compile Data
            const record = {
                distance:distance, 
                positions:positions, 
                steps:steps, 
                duration:duration,
                time:timeStart,
                day:day,
                date:date,
                id:moment().format(),
            }
            //Add to history + update personal stats
            Firestore.db_recordRun(record,
                () => {
                    navigation.navigate("EndRun", {
                        message:"Run Concluded",
                        distance:distance, 
                        positions:positions, 
                        steps:steps, 
                        duration:duration,
                        time:timeStart,
                        day:day,
                        date:date,
                    });
                },
                (error) => {console.log(error)}    
            )
        }
    },[runStatus])


    /* [CHECKS] */
    // useEffect(() => {
    //     // console.log("start coordinates")
    //     // console.log(startCoord)
    //     console.log("Positions")
    //     console.log(positions)
    // },[positions])


    return (
        <SafeAreaView style={styles.overallContainer}>

            {/* Test Component */}
            <>
            {/* <Text>BasicRunning</Text>
            <Text>Start Coords:</Text>
            <Text>{startCoord.latitude}</Text>
            <Text>{startCoord.longitude}</Text>
            <Text></Text>
            <Text>Prev Lat: {prevCoord.latitude}</Text>
            <Text>Prev Long: {prevCoord.longitude}</Text>
            <Text>Curr Lat: {currCoord.latitude}</Text>
            <Text>Curr Long: {currCoord.longitude}</Text>
            <Text>Distance: {distance}</Text> */}
            </>

            <RunningCountdown
                countdown={countdown}
                countdownMsg={countdownMsg}
            />

            <RunningMap 
                runStatus={runStatus}
                positions={positions} 
                currCoord={currCoord}
            />
            <View style={styles.dataContainer}>
                <RunningDistance
                    distance={distance}
                />
                <RunningTimer
                    runStatus={runStatus}
                    setDuration={setDuration}
                />
                <RunningSteps
                    runStatus={runStatus}
                    steps={steps}
                    setSteps={setSteps}
                />
                
                {/* Button Controls */}
                <View style={styles.buttonContainer}>
                    {/* Pause/Play */}
                    {(runStatus === 2) ? <TouchableOpacity
                            style={styles.button}
                            onPress={() => {setRunStatus(3)}}
                        >   
                            <View>
                                <Image 
                                    source={require('../../../assets/icons/ExercisePause.png')}
                                    resizeMode= 'contain'
                                    style={styles.buttonIconStop}
                                />
                            </View>
                        </TouchableOpacity>
                        : ( (runStatus === 3) ? <TouchableOpacity
                            style={styles.button}
                            onPress={() => {setRunStatus(1)}}
                        >   
                            <View>
                                <Image 
                                    source={require('../../../assets/icons/ExercisePlay.png')}
                                    resizeMode= 'contain'
                                    style={styles.buttonIconPlay}
                                />
                            </View>
                        </TouchableOpacity>
                        : <></> )
                    }

                    {/* Stop */}
                    {(runStatus == 2 || runStatus == 3 ? 
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                (runStatus == 2) ? setRunStatus(4) :
                                ( (runStatus == 3) ? setRunStatus(5) : ()=>{} )
                            }}
                        >
                            <View>
                                <Image 
                                    source={require('../../../assets/icons/ExerciseStop.png')}
                                    resizeMode= 'contain'
                                    style={styles.buttonIconStop}
                                />
                            </View>
                        </TouchableOpacity>
                    : <></>
                    )}
                </View>

                <RunningMusic/>
                
            </View>
            {/* Data Container End */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    overallContainer:{
        flex: 1,
    },
    dataContainer:{
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        width: width,
        height: 0.55 * height,
        bottom: 0,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        elevation: 10,
    },
    buttonContainer:{
        width: width,
        padding: 5,
        // backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button:{
        width: 0.1 * height,
        height: 0.1 * height,
        borderRadius: (0.1 * height)/2,
        backgroundColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIconPlay:{
        width: 35,
        height: 35,
        tintColor: '#ffffff',
        transform: [{translateX:5}],
    },
    buttonIconStop:{
        width: 30,
        height: 30,
        tintColor: '#ffffff',
    },
})

export default RunningMain