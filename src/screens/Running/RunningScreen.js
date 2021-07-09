import React, {useState, useEffect, useCallback} from 'react';
import {  SafeAreaView,  ScrollView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';
import { CommonActions } from '@react-navigation/native'; 
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import moment from 'moment';
import TTS from 'react-native-tts';
import { useSelector } from 'react-redux';
import * as Firestore from '../../api/firestore';
import BackgroundTimer from 'react-native-background-timer';

import RunDistance from './components/RunDistance';
import RunTimer from './components/RunTimer';
import RunSteps from './components/RunSteps';
import RunMap from './components/RunMap';
import MusicPlayerRun from './components/MusicPlayerRun';
import RunCountdown from './RunCountdown';

const {width, height} = Dimensions.get("window")

const RunningScreen = ({navigation, route}) => {
    /* [Page Navigation Render] - Triggered upon screen focused  */
    const PageTrigger = navigation.addListener( 'focus', () => {
        getCurrentLocation();
        setRunStatus(1);
    } )


    useEffect(() => {
        const back = navigation.addListener('beforeRemove', (e) => {
            if (runStatus === 2 || runStatus == 3 || runStatus == 8) {
                e.preventDefault();
                setRunStatus(9);
            }
        });
        return back;
    } )
    
    const mode = route.params.mode;
    const tracks = useSelector(state => state.playlists.tracksForRun);

    const [countdown, setCountdown] = useState(true);           //Countdown popup
    const [countdownMsg, setCountdownMsg] = useState("5");      //Countdown message

    const [runStatus, setRunStatus] = useState(0);              //Status of activity
    const [promise, setPromise] = useState({});                 //For GPS Subscription Promise
    
    //GPS Tracking Data
    const [startCoord, setStartCoord] = useState( {latitude: 1.377621, longitude: 103.805178,} );   //Initial coordinate
    const [currCoord, setCurrCoord] = useState(startCoord);     //Current coordinate
    const [positions, setPositions] = useState([startCoord]);   //Array of "valid" positons 
    const [mapPositions, setMapPositions] = useState([])
    const [distance, setDistance] = useState(0);

    //Additonal (For Speaker)
    const [km, setKm] = useState(0);

    //Compiled Data
    const [duration, setDuration] = useState(0);        //Total Run Duration
    const [steps, setSteps] = useState(0);               //Total Run Steps
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

            // console.log('Getting current Location')
            setPositions( [{latitude: latitude, longitude: longitude}] );
            setCurrCoord( {latitude: latitude, longitude: longitude} );

        } catch (error) {
            console.log(error)
        }
    }

    /* [Get current location] */
    const getResumeLocation = async() => {
        try {
            const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync()
            console.log('Getting current Location')

            setPositions( (prevState) => [...prevState, {latitude: latitude, longitude: longitude}] );
            setCurrCoord( {latitude: latitude, longitude: longitude} );
        } catch (error) {
            console.log(error)
        }
    }

    /* [GPS Subcription countdown] */
    const subcriptionCountdown = () => {
        /* 0 second */
        console.log('Starting in 3');
        getCurrentLocation();
        setCountdownMsg(3);
        setCountdown(true);
        
        /* 1 second */
        setTimeout( () => {
            console.log('Starting in 2');
            setCountdownMsg(2);
            getCurrentLocation();
        }, 1000);
    
        /* 2 second */
        setTimeout( () => {
            console.log('Starting in 1');
            setCountdownMsg(1);
        }, 2000);
    
        /* 3 second */
        setTimeout( () => {
            console.log('Start');
            TTS.getInitStatus().then(() => {
                TTS.setDefaultLanguage('en-US');
                // TTS.setDefaultRate(0.5);
                TTS.speak('Run Started');
            });
            subscribePosition();
            setRunStatus(2);
            setCountdown(false);
        }, 3000);
    }

    /* [GPS Subcription countdown] */
    const resumeCountdown = () => {
        /* 0 second */
        console.log('Starting in 3');
        setCountdownMsg(3);
        setCountdown(true);
        
        /* 1 second */
        setTimeout( () => {
            console.log('Starting in 2');
            setCountdownMsg(2);
        }, 1000);
    
        /* 2 second */
        setTimeout( () => {
            console.log('Starting in 1');
            setCountdownMsg(1);
            getResumeLocation();
        }, 2000);
    
        /* 3 second */
        setTimeout( () => {
            console.log('Start');
            TTS.getInitStatus().then(() => {
                TTS.setDefaultLanguage('en-US');
                // TTS.setDefaultRate(0.5);
                TTS.speak('Run Resumed');
            });
            
            subscribePosition();
            setRunStatus(2);
            setCountdown(false);
        }, 3000);
    }

    /* [ON GPS Subscription/Tracking] */
    const subscribePosition = () => {

        if ( Location.hasServicesEnabledAsync() ) {
            console.log('GPS Tracking on')
            setPromise( BackgroundTimer.setInterval(
                async() => {
                    try {
                        const locationObj = await Location.getCurrentPositionAsync();
                        onPositionChange(locationObj);
                    } catch (error) {
                        console.log(error);
                    }
                },
                500 
            ))
        }
    }

    /* [OFF GPS Subscription/Tracking] */
    const unsubscribePosition = () => {
        BackgroundTimer.clearInterval(promise)
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

        setPositions((prev) => [...prev , currPos]);
        setCurrCoord(currPos);
    }

    /* [Position Validation] 
    This checks the distance between the current position & previous position
    Only movement within Limit Range would be taken into consideration of position */
    const positionValidation = () => {
       
        let currPos
        let prevPos
        if (positions.length == 1) {
            currPos = positions[0];
            prevPos = positions[0];
        } else {
            currPos = positions[positions.length - 1];
            prevPos = positions[positions.length - 2];
        }     
        // console.log(currPos)
        // console.log(prevPos)

        /* Calculate distance change from position update */
        const distGain = distanceCalculate(prevPos, currPos)

        /* Validation of position update */
        const minGain = 2.5;
        const maxGain= 20;
        if ( (minGain < distGain) && (distGain < maxGain) ) {
            setDistance((prevCurrentDistance) => (Math.round( (prevCurrentDistance + distGain)*100 ))  / 100);
            setMapPositions((prev) => [...prev, currPos]);
        }
    }

    

    /*                /
    /     Renders     /
    /                */

    /* [Validation of position movement] 
    This renders after every callback from GPS subscription. It validates movements and update accordingly */
    useEffect(() => {
        if (runStatus == 2 || runStatus == 8 || runStatus == 9) {
            positionValidation();
            // console.log("validating")
        }
    },[positions])
  
    const [paused , setPaused] = useState(false);
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
            setPaused(false);
            console.log("RunStatus - 2: Running");
        }
        if (runStatus === 3) {
            console.log("RunStatus - 3: Pause");
            // unsubscribePosition();
            setPaused(true);
            TTS.getInitStatus().then(() => {
                TTS.setDefaultLanguage('en-US');
                // TTS.setDefaultRate(0.5);
                TTS.speak('Run Paused');
            });
        }
        if (runStatus === 4) {
            console.log("RunStatus - 4: BACK confirm");
            if (!paused) {
                unsubscribePosition();
            }
            navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: 'AppTab'}]}));
        }
        if (runStatus === 8) { 
            console.log("RunStatus - 8: on BACK Press");
            Alert.alert(
                "Leave Run",
                "Are you sure you want to leave the run? The run record will not be saved.",
                [ { text:"Cancel", onPress: () => {} }, 
                { text:"Confirm", onPress: () => {setRunStatus(4)} }]
            )
            //Alert > (N)=>{close without change} (Y)=> setRunStatus (4)
        }
        if (runStatus === 9) {
            console.log("RunStatus - 9");
            setRunStatus(8);
        }
        if (runStatus === 5) {
            console.log("RunStatus - 5: Stop from Pause");
            unsubscribePosition();
            setRunStatus(6);
        }
        if (runStatus === 6) {
            console.log("RunStatus - 6: Run End");

            if (distance >= 10) {
                //Compile Data
                const record = {
                    distance:distance, 
                    positions:mapPositions, 
                    steps:steps, 
                    duration:duration,
                    time:timeStart,
                    day:day,
                    date:date,
                    mode: mode,
                    id:moment().format(),
                }
                //Add to history + update personal stats (If the user sets to "recordHistory to true")
                Firestore.db_recordRun(record,
                    () => {
                        navigation.navigate("EndScreen", {
                            message:"Run Concluded",
                            distance:distance, 
                            positions:mapPositions, 
                            steps:steps, 
                            duration:duration,
                            time:timeStart,
                            day:day,
                            date:date,
                            mode: mode,
                        });
                    },
                    (error) => {console.log(error)}    
                )
                
                //Update Stride Distance, only if user in Calibration mode
                if (mode=="Calibration") {
                    const strideDistance = (distance / steps)
                    Firestore.db_calibrateStride(strideDistance);
                }
            } else {

                Alert.alert(
                    "Run Stopped",
                    "You haven't covered enough ground to create a record. End Run?",
                    [ { text:"Continue", onPress: () => {setRunStatus(3)} }, 
                    { text:"Understood", onPress: () => {
                        navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: 'AppTab'}],}),);
                        TTS.getInitStatus().then(()=> TTS.speak('Run Ended'));
                    } } ]
                )
            }
            
        }
    },[runStatus])


    /* [CHECKS] */
    // useEffect(() => {
    //     // console.log("start coordinates")
    //     // console.log(startCoord)
    //     console.log("Positions")
    //     console.log(positions)
    //     console.log("map pos")
    //     console.log(mapPositions)
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
                    {(runStatus === 2 || (runStatus === 8 && !paused) || (runStatus === 9 && !paused)) ?  <TouchableOpacity style={styles.button} onPress={() => setRunStatus(3)}>
                        <Image 
                            source={require('../../assets/icons/ExercisePause.png')}
                            resizeMode= 'contain'
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity> : <></>}

                    {/* Play button */}
                    {(runStatus === 3 || (runStatus === 8 && paused) || (runStatus === 9 && paused)) ? <TouchableOpacity style={styles.button} onPress={() => setRunStatus(7)}>
                        <Image 
                            source={require('../../assets/icons/ExercisePlay.png')}
                            resizeMode= 'contain'
                            style={styles.startIcon}
                        />
                    </TouchableOpacity> : <></>}
                    
                    {/* Stop button */}
                    {(runStatus === 3 || (runStatus === 8 && paused) || (runStatus === 9 && paused)) ? <TouchableOpacity style={styles.button} onPress={() => setRunStatus(5)}>
                        <Image 
                            source={require('../../assets/icons/ExerciseStop.png')}
                            resizeMode= 'contain'
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity> : <></>}
                    
                </View>

            </View>


            {/* Map */}
            <View style={styles.mapContainer}>
                <RunMap
                    runStatus={runStatus}
                    mapPositions={mapPositions} 
                    currCoord={currCoord}
                />
            </View>

            {/* Music Player */}
            { (tracks.length == 0) ? <></> : 
                <View style={styles.musicPlayer}>
                    <MusicPlayerRun runStatus={runStatus}/>
                </View>
            }

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
    buttonIcon:{
        height: height * 0.05,
        aspectRatio: 1,
        tintColor: '#BABBBF',
    },
    startIcon:{
        height: height * 0.05,
        aspectRatio: 1,
        transform: [{translateX: width * 0.01}],
        tintColor: '#BABBBF',
    },
    mapContainer:{
        width: width,
        height: height * 0.7,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },
    musicPlayer:{
        position: 'absolute',
        bottom: height * 0.01,
        alignSelf: 'center',
    },
})

export default RunningScreen;