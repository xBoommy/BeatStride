import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, Keyboard, Modal, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from "react-native-paper";

import * as Firestore from '../../api/firestore';

const {width, height} = Dimensions.get("window")

const PlaylistSelectionBasic = (props) => {
    const settingToggle = props.settingToggle;
    const setSettingToggle = props.setSettingToggle;

    const [kilometre, setKilometre] = useState(0);
    const [metre, setMetre] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);

    const updateGoals = () => {
        const distance = parseFloat(metre) + (parseFloat(kilometre) * 1000)
        const time = parseFloat(minute) + (parseFloat(hour) * 60)

        // console.log(parseFloat(kilometre) * 1000)
        // console.log(typeof distance)
        // console.log(time)
        // console.log(typeof time)
        // console.log(kilometre)
        // console.log(metre)
        // console.log(hour)
        // console.log(minute)

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
    }

    useEffect(() => {
        setKilometre(0);
        setMetre(0);
        setHour(0);
        setMinute(0);
    },[settingToggle])

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

                        <View style={styles.inputContainer}>
                            <View style={styles.unitContainer}>
                                {/* Hour */}
                                <TextInput
                                    mode="outlined"
                                    label="Time (hr)"
                                    keyboardType="phone-pad"
                                    style={styles.textInput}
                                    placeholder="Hour(s)"
                                    onChangeText={setHour}
                                    autoCapitalize="none"
                                    returnKeyType="default"
                                    onSubmitEditing={() => {Keyboard.dismiss()}}
                                    blurOnSubmit={false}
                                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#BABBBF', underlineColor: 'transparent', background: '#4F535C'},}}
                                />
                                <Text style={styles.unitText}> hr</Text>
                            </View>

                            <View style={styles.unitContainer}>
                                {/* Minute */}
                                <TextInput
                                    mode="outlined"
                                    label="Time (min)"
                                    keyboardType="phone-pad"
                                    style={styles.textInput}
                                    placeholder="Minute(s)"
                                    onChangeText={setMinute}
                                    autoCapitalize="none"
                                    returnKeyType="default"
                                    onSubmitEditing={() => {Keyboard.dismiss()}}
                                    blurOnSubmit={false}
                                    theme={{colors: {primary: "#7289DA", placeholder : '#72767D', text: '#BABBBF', underlineColor: 'transparent', background: '#4F535C'},}}
                                />
                                <Text style={styles.unitText}> min</Text>
                            </View>
                        </View>
                        
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
        height: height * 0.5,
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
        height: height * 0.07,
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
        height: height * 0.08,
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
        height: height * 0.06,
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
})
export default PlaylistSelectionBasic