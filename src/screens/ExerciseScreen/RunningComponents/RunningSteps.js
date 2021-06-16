import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

import textStyle from '../../../constants/textStyle';

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
        paddingTop: 5,
    },
    dataContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    dataText:{
        ...textStyle.header,
    },
    unitText:{
        ...textStyle.title,
    },
    label:{
        ...textStyle.subtitle,
    }
})
export default RunningSteps;