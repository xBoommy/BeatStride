import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window")

const RunningSteps = (props) => {
    const steps = props.steps;
    const setSteps = props.setSteps;

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{steps}</Text>
                <Text style={styles.unitText}></Text>
            </View>

            <Text style={styles.label}>Steps</Text>
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        padding: 5,
    },
    dataContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    dataText:{
        fontWeight: 'bold',
        fontSize: 0.04 * height,
    },
    unitText:{
        fontWeight: 'bold',
        fontSize: 0.02 * height,
    },
    label:{
        fontSize: 0.018 * height,
    }
})
export default RunningSteps;