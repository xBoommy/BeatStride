import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import * as Location from 'expo-location';
import * as Firestore from '../../../api/firestore';
import moment from 'moment';
import PlaylistSelectionTempo from '../PlaylistSelectionTempo';
import SelectLoading from './SelectLoading';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing the Tempo run on Run Tab on the Exercise page.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const TempoRun = () => {
    const navigation = useNavigation();
    const [selectToggle, setSelectToggle] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(0);
    const [goalDistance, setGoalDistance] = useState(0);
    const [goalTime, setGoalTime] = useState(0);
    const [strideDistance, setStrideDistance] = useState(0);
    const [BPM, setBPM] = useState(0);
    const time = moment.duration(goalTime);

    /**
     * This is a method to check the status of device's location service.
     */
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

    /**
     * This is a render effect based on "status" state.
     */
    useEffect(() => {
        if (status === 1) {
            console.log("GPS Enabled")
            if (strideDistance > 0) {
                if (goalDistance != 0 && goalTime != 0) {
                    setSelectToggle(true);
                } else {
                    Alert.alert(
                        "Set a Goal",
                        "Tempo Run requires distance and time for calibration. Please set your goal and try again.",
                        [ { text:"Understood", onPress: () => {console.log("Alert closed")} } ]
                    )
                }
                
            } else {
                Alert.alert(
                    "Unable to Calculate BPM",
                    "Tempo Run requires calibration prior to usage. Please complete a calibration run at least once and try again.",
                    [ { text:"Understood", onPress: () => {console.log("Alert closed")} } ]
                )
            }
            
        }
        if (status === 6) {
            console.log("Checking GPS Service")
            seviceCheck();
        }
    },[status])

    /**
     * This is a render effect triggered on component mount.
     */
    useEffect(() => {
        Firestore.db_getUserDataSnapshot(
            (userData) => {
                setGoalDistance(userData.goalDistance);
                setGoalTime(userData.goalTime);
                setStrideDistance(userData.strideDistance);
            },
            (error) => {console.log(error)},
        )
    }, [])

    /**
     * This is a method to calculate the recommended BPM for the user.
     */
    const recommendedBPM = () => {
        if (strideDistance > 0 && goalTime > 0){
            const numOfSteps = (goalDistance / strideDistance)
            const BPM = numOfSteps / (goalTime/60000)
            const rounded_BPM = round5(BPM)

            setBPM(rounded_BPM);
            // console.log(rounded_BPM)
        }
    }

    /**
     * This is a helper method to round a number value to the nearest 5-multiple value.
     * @param {Number} num  A number value that is to be rounded.
     * @returns A number that is rounded to the nearest 5-multiple value.
     */
    const round5 = (num) => {
        return (num % 5) >= 2.5 ? parseInt(num/5)*5 + 5 : parseInt(num / 5) * 5
    }

    /**
     * This is a render effect based on "strideDistance", "goalDistance" & "goalTime" state.
     */
    useEffect(() => {
        recommendedBPM();
    }, [strideDistance, goalDistance, goalTime])
    
    return (
        <View style={styles.componentContainer}>

            {/* Text */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Tempo Run</Text>
                
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>Sync up music to help you achieve your target.</Text>
            </View>

            {/* Start Button */}
            <TouchableOpacity style={styles.startButton} onPress={() => setStatus(6)}>
                <View>
                    <Image 
                        source={require('../../../assets/icons/ExercisePlay.png')}
                        resizeMode= 'contain'
                        style={styles.startIcon}
                    />
                </View>
            </TouchableOpacity>

            {/* Target */}
            <View style={styles.targetContainer}>
                <View style={styles.goalTextContainer}>
                    <View style={styles.goalValue}>
                        <Text style={styles.goalText}>Distance</Text>
                        <Text style={styles.goalText}>{(goalDistance / 1000).toFixed(2)} km</Text>
                    </View>
                    <View style={styles.goalValue}>
                        <Text style={styles.goalText}>Time</Text>
                        <Text style={styles.goalText}>
                            {(time.hours() != 0) ? time.hours() + "hr " : ""} 
                            {time.minutes() != 0 ? time.minutes() + "min " : ""} 
                            {((time.hours() != 0) || (time.minutes() != 0)) ? ((time.seconds() != 0) ? (time.seconds() + "s") : ("")) : (time.seconds() + "s")}
                        </Text>
                    </View>
                    
                </View>

                {/* Goal Button */}
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate("GoalSettingScreen", 
                            {goalDistance:goalDistance, goalTime:goalTime, strideDistance:strideDistance}
                        )
                    }}
                    >
                    <View style={styles.goalButton}>
                        <Text style={styles.buttonText}>Edit Goal</Text>
                    </View>
                </TouchableOpacity>

            </View>


            {/* Playlist Selection Popup */}
            <PlaylistSelectionTempo
                selectToggle={selectToggle}
                setSelectToggle={setSelectToggle}
                mode={"Tempo"}
                setIsLoading={setIsLoading}
                BPM={BPM}
            />

            {/* Loading Modal */}
            <SelectLoading
                isLoading={isLoading}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width * 0.95,
        height: height * 0.25,
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#7289DA',
    },  
    titleContainer:{
        width: width * 0.65,
        height: height * 0.08,
        justifyContent:'center',
        paddingLeft: width * 0.7 * 0.1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#42474D',
    },
    titleText:{
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    descriptionContainer:{
        width: width * 0.63,
        height: height * 0.06,
        paddingLeft: width * 0.7 * 0.05,
        paddingTop: height * 0.08 * 0.1,
        // backgroundColor: 'yellow',
    },
    descriptionText:{
        fontSize: 12,
        color: '#BABBBF',
    },
    startButton:{
        height: height * 0.1,
        aspectRatio: 1,
        borderRadius: height,
        position: 'absolute',
        right: ((width * 0.95) - (width * 0.65) - (height * 0.1)) * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42474D',
    },
    startIcon:{
        height: height * 0.05,
        aspectRatio: 1,
        transform: [{translateX: width * 0.01}],
        tintColor: '#7289DA',
    },
    targetContainer:{
        height: height * 0.07,
        width: width * 0.65,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'purple',
    },
    goalTextContainer:{
        width: width * 0.65 * 0.65,
        paddingRight: width * 0.65 * 0.05,
        paddingLeft: width * 0.7 * 0.05,
        // backgroundColor: 'pink',
    },
    goalText:{
        fontWeight: 'bold',
        fontSize: 12,
        color: '#FFFFFF'
    },
    goalValue:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    goalButton:{
        width: width * 0.65 * 0.3,
        height: height * 0.07 * 0.6,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#42474D',
    },
    buttonText:{
        fontSize: 12,
        fontWeight: 'bold',
        color: '#BABBBF',
    },
})

export default TempoRun;
