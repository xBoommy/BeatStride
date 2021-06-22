import React, {useState, useEffect} from 'react';
import {  SafeAreaView,  ScrollView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity} from 'react-native';
import { CommonActions } from '@react-navigation/native'; 
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import moment from 'moment';
import TTS from 'react-native-tts';
import * as Firestore from '../../api/firestore';

import RunDistance from './components/RunDistance';
import RunTimer from './components/RunTimer';
import RunSteps from './components/RunSteps';
import RunMap from './components/RunMap';
import MusicPlayerRun from './components/MusicPlayerRun';
import RunCountdown from './RunCountdown';

const {width, height} = Dimensions.get("window")

const RunningScreen = ({navigation}) => {
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

    //Additonal (For Speaker)
    const [km, setKm] = useState(0);

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

    /* [Get current location] */
    const getResumeLocation = async() => {
        try {
            const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync()
            console.log('Getting current Location')

            setPositions( (prevState) => [...prevState, currCoord, currCoord] );
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
            TTS.getInitStatus().then(()=> TTS.speak('Run Started'));
            subscribePosition();
            setRunStatus(2);
            setCountdown(false);
        }, 5000);
    }

    /* [GPS Subcription countdown] */
    const resumeCountdown = () => {
        /* 0 second */
        console.log('Starting in 5');
        setCountdownMsg(5);
        setCountdown(true);
        
        /* 1 second */
        setTimeout( () => {
            console.log('Starting in 4');
            setCountdownMsg(4);
        }, 1000);
    
        /* 2 second */
        setTimeout( () => {
            console.log('Starting in 3');
            setCountdownMsg(3);
        }, 2000);

        /* 3 second */
        setTimeout( () => {
            console.log('Starting in 2');
            getResumeLocation();
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
            TTS.getInitStatus().then(()=> TTS.speak('Run Resumed'));
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
            setDate(moment().format('L'));
        }
        if (runStatus === 1) {
            console.log("RunStatus - 1: Initializing");
            subcriptionCountdown();
            getCurrentLocation();
        }
        if (runStatus === 7) {
            console.log("RunStatus - 7: Run-resume");
            resumeCountdown();
        }
        if (runStatus === 2) {
            console.log("RunStatus - 2: Running");
        }
        if (runStatus === 3) {
            console.log("RunStatus - 3: Pause");
            unsubscribePosition();
            TTS.getInitStatus().then(()=> TTS.speak('Run Paused'));
        }
        if (runStatus === 4) {
            console.log("RunStatus - 4: Stop from Running");
            unsubscribePosition();
            TTS.getInitStatus().then(()=> TTS.speak('Run Ended'));
            setRunStatus(6);
        }

        if (runStatus === 5) {
            console.log("RunStatus - 5: Stop from Pause");
            TTS.getInitStatus().then(()=> TTS.speak('Run Ended'));
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
                    navigation.navigate("EndScreen", {
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
        <SafeAreaView style={styles.screen}>

            <View style={styles.contentContainer}>

                {/* Distance */}
                <View style={styles.distanceContainer}>
                    <RunDistance
                        distance={distance}
                    />
                </View>

                <View style={styles.secondaryDataContainer}>
                    {/* Time */}
                    <View style={styles.timeContainer}>
                        <RunTimer
                            runStatus={runStatus}
                            setDuration={setDuration}
                            distance={distance}
                            km={km}
                            setKm={setKm}
                        />
                    </View>
                    {/* Steps */}
                    <View style={styles.stepsContainer}>
                        <RunSteps
                            runStatus={runStatus}
                            steps={steps}
                            setSteps={setSteps}
                        />
                    </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>

                    {/* Pause button */}
                    {(runStatus === 2) ?  <TouchableOpacity style={styles.button} onPress={() => setRunStatus(3)}>

                    </TouchableOpacity> : <></>}

                    {/* Play button */}
                    {(runStatus === 3) ? <TouchableOpacity style={styles.button} onPress={() => setRunStatus(7)}>

                    </TouchableOpacity> : <></>}
                    
                    {/* Stop button */}
                    {(runStatus === 3) ? <TouchableOpacity style={styles.button} onPress={() => setRunStatus(5)}>
                    </TouchableOpacity> : <></>}
                    

                    
                    

                    

                </View>

            </View>


            {/* Map */}
            <View style={styles.mapContainer}>
                <RunMap
                    runStatus={runStatus}
                    positions={positions} 
                    currCoord={currCoord}
                />
            </View>

            {/* Music Player */}
            <View style={styles.musicPlayer}>
                <MusicPlayerRun/>
            </View>

            {/* Countdown */}
            <RunCountdown
                countdown={countdown}
                countdownMsg={countdownMsg}
            />
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