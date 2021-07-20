import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, Keyboard, Modal, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from "react-native-paper";
import Picker from '@gregfrench/react-native-wheel-picker'
import moment from 'moment';
var PickerItem = Picker.Item;

import * as Firestore from '../../api/firestore';

const {width, height} = Dimensions.get("window")

const PlaylistSelectionBasic = (props) => {
    const settingToggle = props.settingToggle;
    const setSettingToggle = props.setSettingToggle;
    const strideDistance = props.strideDistance;
    const goalDistance = props.goalDistance;
    const goalTime = props.goalTime;
    const time = moment.duration(goalTime);

    const [kilometre, setKilometre] = useState(parseInt((goalDistance / 1000).toFixed(0)));
    const [metre, setMetre] = useState(goalDistance % 1000);
    const [hour, setHour] = useState(time.hours());
    const [minute, setMinute] = useState(time.minutes());
    const [second, setSecond] = useState(time.seconds());
    const [BPM, setBPM] = useState(0);

    const updateGoals = () => {
        const distance = parseFloat(metre) + (parseFloat(kilometre) * 1000)
        const time = second * 1000 + (minute) * 60000 + (hour) * 60 * 60000;

        // console.log(parseFloat(kilometre) * 1000)
        // console.log(typeof distance)
        // console.log(time)
        // console.log(typeof time)
        // console.log(kilometre)
        // console.log(metre)
        // console.log(hour)
        // console.log(minute)
        // console.log(goalDistance);

        if ((typeof distance === 'number') && (typeof time === 'number') && (distance >= 10) && (time > 0)) {
            Firestore.db_editGoals(distance, time, 
                () => {
                    setSettingToggle(false);
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

    const round5 = (num) => {
        return (num % 5) >= 2.5 ? parseInt(num/5)*5 + 5 : parseInt(num / 5) * 5
    };

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

    useEffect(() => {
        recommendedBPM();
    },[hour, minute, second, kilometre, metre]);

    return (
        <Modal visible={settingToggle} transparent={true} animationType={'slide'}>
            <View style={styles.modal}>

                {/* PopUp Area */}
                <View style={styles.settingContainer}>

                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Edit Goal</Text>
                    </View>

                    <View style={styles.contentContainer}>

                        <View style={styles.subHeaderContainer}>
                            <Text style={styles.subHeaderText}>Set Goal Distance (Min. 10m)</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.unitContainer}>
                                {/* Kilometre */}
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

                            <View style={styles.unitContainer}>
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

                        <View style={styles.subHeaderContainer}>
                            <Text style={styles.subHeaderText}>Set Goal Time</Text>
                        </View>

                        <View style={styles.scrollPickerComponent}>

                            {/* Hour */}
                            <View style={styles.scrollPickerContainer}>
                                <Text>Hours</Text>
                                <Text>
                                    <Picker style={styles.scrollPickerContainer}
                                        lineColor="#FFFFFF"
                                        selectedValue={hour}
                                        itemStyle={{color:"#FFFFFF", fontSize: 14}}
                                        onValueChange={(index) => setHour(index) }>
                                        {[...Array(24).keys()].map((value, i) => (
                                            <PickerItem label={value.toString()} value={i} key={i}/>
                                        ))}
                                    </Picker>
                                </Text>
                            </View>

                            {/* Minutes */}
                            <View style={styles.scrollPickerContainer}>
                                <Text>Minutes</Text>
                                <Text>
                                    <Picker style={styles.scrollPickerContainer}
                                        lineColor="#FFFFFF"
                                        selectedValue={minute}
                                        itemStyle={{color:"#FFFFFF", fontSize: 14}}
                                        onValueChange={(index) => setMinute(index) }>
                                        {[...Array(60).keys()].map((value, i) => (
                                            <PickerItem label={value.toString()} value={i} key={i}/>
                                        ))}
                                    </Picker>
                                </Text>
                            </View>
                            
                            {/* Seconds */}
                            <View style={styles.scrollPickerContainer}>
                                <Text>Seconds</Text>
                                <Text>
                                    <Picker style={styles.scrollPickerContainer}
                                        lineColor="#FFFFFF"
                                        selectedValue={second}
                                        itemStyle={{color:"#FFFFFF", fontSize: 14}}
                                        onValueChange={(index) => setSecond(index) }>
                                        {[...Array(60).keys()].map((value, i) => (
                                            <PickerItem label={value.toString()} value={i} key={i}/>
                                        ))}
                                    </Picker>
                                </Text>
                            </View>
                            
                        </View>

                        <Text>Recommended BPM: {BPM}</Text>
                        
                    </View>

                    {/* Button Container */}
                    <View style={styles.buttonContainer}>
                        {/* Cancel Button */}
                        <TouchableOpacity 
                            onPress={() => {
                                Keyboard.dismiss();
                                setSettingToggle(false);
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

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal:{
        width: width,
        height: height,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    settingContainer:{
        width: width * 0.95,
        height: height * 0.7,
        borderRadius: 5,
        backgroundColor: '#36393E',
    },
    headerContainer:{
        width: width * 0.95,
        height: height * 0.07,
        justifyContent:'center',
        paddingHorizontal: width * 0.1,
        // backgroundColor: 'yellow',
    },
    headerText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#BABBBF'
    },
    contentContainer:{
        width: width * 0.95,
        height: height * 0.43 - (height * 0.13 * 0.4) - (height * 0.95 * 0.03),
        // backgroundColor: 'yellow',
    },
    subHeaderContainer:{
        width: width * 0.95, 
        height: height * 0.05,
        justifyContent: 'flex-end',
        paddingHorizontal: width * 0.95 * 0.05,
    },
    subHeaderText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#BABBBF'
    },
    inputContainer:{
        width: width * 0.95, 
        height: height * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    unitContainer:{
        width: width * 0.95 * 0.5, 
        height: height * 0.08,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    unitText:{
        fontWeight: 'bold',
        fontSize: 14,
        color: '#BABBBF'
    },
    textInput:{
        width: width * 0.95 * 0.38, 
        // height: height * 0.06,
    },
    buttonContainer:{
        position: 'absolute',
        width: width * 0.7,
        bottom: height * 0.95 * 0.02 ,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
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
    scrollPickerComponent: {
        width: width * 0.95, 
        height: height * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    scrollPickerContainer:{
        height: height * 0.05,
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
})
export default PlaylistSelectionBasic