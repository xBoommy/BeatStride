import React, { useState, useRef } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';

import PlaylistSelectionTempo from '../PlaylistSelectionTempo';
import GoalSetting from '../GoalSetting';

const {width, height} = Dimensions.get("window")

const TempoRun = () => {
    const [selectToggle, setSelectToggle] = useState(false)
    const [settingToggle, setSettingToggle] = useState(false)

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
            <TouchableOpacity style={styles.startButton} onPress={() => {setSelectToggle(true)}}>
                <View>
                    {/* resizeMode={"contain"} */}
                    {/* style={styles.startIcon} */}
                </View>
            </TouchableOpacity>

            {/* Target */}
            <View style={styles.targetContainer}>
                <View style={styles.goalTextContainer}>
                    <View style={styles.goalValue}>
                        <Text style={styles.goalText}>Distance</Text>
                        <Text style={styles.goalText}>42.24 km</Text>
                    </View>
                    <View style={styles.goalValue}>
                        <Text style={styles.goalText}>Time</Text>
                        <Text style={styles.goalText}>24 hr 56 min</Text>
                    </View>
                    
                </View>

                {/* Goal Button */}
                <TouchableOpacity onPress={() => {setSettingToggle(true)}}>
                    <View style={styles.goalButton}>
                        <Text style={styles.buttonText}>Edit Goal</Text>
                    </View>
                </TouchableOpacity>

            </View>


            {/* Playlist Selection Popup */}
            <PlaylistSelectionTempo
                selectToggle={selectToggle}
                setSelectToggle={setSelectToggle}
            />

            {/* Goal Setting Popup */}
            <GoalSetting
                settingToggle={settingToggle}
                setSettingToggle={setSettingToggle}
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
        backgroundColor: '#42474D',
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