import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import * as geolib from 'geolib';

const {width, height} = Dimensions.get("window")

const RunningDistance = (props) => {
    const distance = props.distance

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <Text style={styles.dataText}>{distance}</Text>
                <Text style={styles.unitText}> m</Text>
            </View>

            <Text style={styles.label}>Distance</Text>
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
        fontSize: 0.05 * height,
    },
    unitText:{
        fontWeight: 'bold',
        fontSize: 0.02 * height,
    },
    label:{
        fontSize: 0.018 * height,
    }
})
export default RunningDistance;