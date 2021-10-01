import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, Keyboard, Modal, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from "react-native-paper";
import Picker from '@gregfrench/react-native-wheel-picker'
import moment from 'moment';
var PickerItem = Picker.Item;

import * as Firestore from '../../api/firestore';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing the Goal Setting Screen.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const GoalSettingScreen = ({navigation, route}) => {
    const strideDistance = route.params.strideDistance;
    const goalDistance = route.params.goalDistance;
    const goalTime = route.params.goalTime;
    const time = moment.duration(goalTime);

    const [kilometre, setKilometre] = useState(parseInt((goalDistance / 1000).toFixed(0)));
    const [metre, setMetre] = useState(goalDistance % 1000);
    const [hour, setHour] = useState(time.hours());
    const [minute, setMinute] = useState(time.minutes());
    const [second, setSecond] = useState(time.seconds());
    const [BPM, setBPM] = useState(0);

    /**
     * This is a method to update & upload the newly set goals onto firestore.
     */
    const updateGoals = () => {
        const distance = parseFloat(metre) + (parseFloat(kilometre) * 1000)
        const time = second * 1000 + (minute) * 60000 + (hour) * 60 * 60000;

        if ((typeof distance === 'number') && (typeof time === 'number') && (distance >= 10) && (time > 0)) {
            Firestore.db_editGoals(distance, time, 
                () => {
                    navigation.goBack();
                }
            );
        } else {
            Alert.alert(
                "Invalid Input",
                "Please input valid numbers only.\n \nPlease check: \nNegative or zero values are not accepted.",
                [ { text:"Understood", onPress: () => {console.log("Alert closed")} } ]
            )
        }
    };

    /**
     * This is a helper method to round a number value to the nearest 5-multiple value.
     * @param {Number} num  A number value that is to be rounded.
     * @returns A number that is rounded to the nearest 5-multiple value.
     */
    const round5 = (num) => {
        return (num % 5) >= 2.5 ? parseInt(num/5)*5 + 5 : parseInt(num / 5) * 5
    };

    /**
     * This is a method to calculate the recommended BPM for the user.
     */
    const recommendedBPM = () => {
        const distance = parseFloat(metre) + (parseFloat(kilometre) * 1000)
        const time = second * 1000 + (minute) * 60000 + (hour) * 60 * 60000;

        if (strideDistance > 0 && time > 0){
            const numOfSteps = (distance / strideDistance)
            const BPM = numOfSteps / (time/60000)

            const rounded_BPM = round5(BPM)

            setBPM(rounded_BPM);
            // console.log(rounded_BPM)
        }
    };

    /**
     * This is a render effect based on "hour", "minute", "second", "kilometre" & "metre" status.
     */
    useEffect(() => {
        recommendedBPM();
    },[hour, minute, second, kilometre, metre]);

    /**
     * This is a constant render effect triggered upon component changes.
     */
    useEffect(() => {})

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.contentContainer}>

                {/* sub header for DISTANCE*/}
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.subHeaderText}>Set Goal Distance (Min. 10m)</Text>
                </View>

                {/* Distance Setting */}
                <View style={styles.distanceContainer}>
                    {/* Kilometre */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={kilometre.toString()}
                            mode="outlined"
                            label="Distance (km)"
                            keyboardType="phone-pad"
                            style={styles.textInput}
                            placeholder="Kilometre"
                            onChangeText={setKilometre}
                            autoCapitalize="none"
                            returnKeyType="default"
                            onSubmitEditing={() => {Keyboard.dismiss()}}
                            blurOnSubmit={false}
                            theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#BABBBF', underlineColor: 'transparent', background: '#4F535C'},}}
                        />
                        <Text style={styles.unitText}> km</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        {/* Metre */}
                        <TextInput
                            value={metre.toString()}
                            mode="outlined"
                            label="Distance (m)"
                            keyboardType="phone-pad"
                            style={styles.textInput}
                            placeholder="Metre"
                            onChangeText={setMetre}
                            autoCapitalize="none"
                            returnKeyType="default"
                            onSubmitEditing={() => {Keyboard.dismiss()}}
                            blurOnSubmit={false}
                            theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#BABBBF', underlineColor: 'transparent', background: '#4F535C'},}}
                        />
                        <Text style={styles.unitText}> m</Text>
                    </View>
                </View>

                {/* sub header for TIME*/}

                <View style={styles.subHeaderContainer}>
                    <Text style={styles.subHeaderText}>Set Goal Time</Text>
                </View>

                <View style={styles.timeComponent}>

                    {/* Hour */}
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeLabel}>Hours</Text>
                        <Text>
                            <View style={styles.scrollPickerContainer}>
                                <Picker style={styles.scrollPickerComponent}
                                    lineColor="#FFFFFF"
                                    selectedValue={hour}
                                    itemStyle={{color:"#FFFFFF", fontSize: 14}}
                                    onValueChange={(index) => setHour(index) }>
                                    {[...Array(24).keys()].map((value, i) => (
                                        <PickerItem label={value.toString()} value={i} key={i}/>
                                    ))}
                                </Picker>
                            </View>
                        </Text>
                    </View>

                    {/* Minutes */}
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeLabel}>Minutes</Text>
                        <Text>
                            <View style={styles.scrollPickerContainer}>
                                <Picker style={styles.scrollPickerComponent}
                                    lineColor="#FFFFFF"
                                    selectedValue={minute}
                                    itemStyle={{color:"#FFFFFF", fontSize: 14}}
                                    onValueChange={(index) => setMinute(index) }>
                                    {[...Array(60).keys()].map((value, i) => (
                                        <PickerItem label={value.toString()} value={i} key={i}/>
                                    ))}
                                </Picker>
                            </View>
                        </Text>
                    </View>
                    
                    {/* Seconds */}
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeLabel}>Seconds</Text>
                        <Text>
                            <View style={styles.scrollPickerContainer}>
                                <Picker style={styles.scrollPickerComponent}
                                    lineColor="#FFFFFF"
                                    selectedValue={second}
                                    itemStyle={{color:"#FFFFFF", fontSize: 14}}
                                    onValueChange={(index) => setSecond(index) }>
                                    {[...Array(60).keys()].map((value, i) => (
                                        <PickerItem label={value.toString()} value={i} key={i}/>
                                    ))}
                                </Picker>
                            </View>
                        </Text>
                    </View>
                    
                </View>

                {/* recommended BPM */}
                <View style={styles.recommendedContainer}>
                    <Text style={styles.recommendedText}>Recommended BPM:</Text>
                    <Text style={styles.recommendedData}>{BPM}</Text>
                </View>

                {/* Button Container */}
                <View style={styles.buttonContainer}>
                    {/* Cancel Button */}
                    <TouchableOpacity 
                        onPress={() => {
                            Keyboard.dismiss();
                            navigation.goBack();
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Confirm Button */}
                    <TouchableOpacity 
                        onPress={() => {
                            Keyboard.dismiss();
                            updateGoals();
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </View>
                    </TouchableOpacity>
                </View>

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
        height: height * 0.9,
        // backgroundColor: 'yellow',
    },
    subHeaderContainer:{
        width: width * 0.95, 
        height: height * 0.1,
        justifyContent: 'flex-end',
        paddingHorizontal: width * 0.95 * 0.05,
    },
    subHeaderText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#BABBBF'
    },
    distanceContainer:{
        width: width,
        height: height * 0.15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    inputContainer:{
        width: width * 0.5, 
        height: height * 0.1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    textInput:{
        width: width * 0.95 * 0.38, 
    },
    unitText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#BABBBF'
    },
    timeComponent: {
        width: width, 
        height: height * 0.2,
        paddingTop: height * 0.01,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    timeContainer:{
        height: height * 0.16,
        width: width * 0.25,
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    scrollPickerContainer:{
        height: height * 0.12,
        width: width * 0.25,
        borderColor: '#72767D',
        borderWidth: 1,
        borderRadius:5 ,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'orange',
    },
    scrollPickerComponent:{
        height: height * 0.1,
        width: width * 0.175,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    timeLabel:{
        fontWeight: 'bold',
        fontSize: 14,
        color: '#BABBBF'
    },
    recommendedContainer:{
        width: width,
        height: height * 0.1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    recommendedText:{
        fontSize: 14,
        color: '#BABBBF'
    },
    recommendedData:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF'
    },
    buttonContainer:{
        width: width * 0.7,
        height: height * 0.15,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'brown',
    },
    button:{
        width: width * 0.3,
        height: height * 0.13 * 0.4,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#72767D',
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})
export default GoalSettingScreen