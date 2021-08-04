import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions } from 'react-native';
import { startCounter, stopCounter } from 'react-native-accurate-step-counter';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing the steps display during a run.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const RunSteps = (props) => {
    const steps = props.steps;
    const setSteps = props.setSteps;
    const runStatus = props.runStatus;

    const [stepCounter, setStepCounter] = useState(0);

    const config = {
        default_threshold: 15.0,
        default_delay: 150000000,
        cheatInterval: 3000,
        onStepCountChange: (stepCount) => { setStepCounter(stepCount) },
        onCheat: () => { console.log("User is Cheating") }
    }

    useEffect(() => {
        if (runStatus == 2 || runStatus == 8 || runStatus == 9){
            setSteps((prevSteps) => prevSteps + 1)
        }
    },[stepCounter])

    /* [Run Status Render] 
    This render is triggered upon a change in app status */
    useEffect(() => {
        if (runStatus == 2){
            startCounter(config)
        }
        if (runStatus == 3){
            stopCounter()
        }
        if (runStatus == 4 || runStatus == 5){
            stopCounter()
        }
    },[runStatus])




    return (
        <View style={styles.componentContainer}>
            <Text numberOfLines={1} style={styles.text}>{steps}</Text>
            <Text style={styles.subtext}>Steps</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subtext:{
        fontSize: 14,
        color: '#BABBBF',
    },
});

export default RunSteps;
