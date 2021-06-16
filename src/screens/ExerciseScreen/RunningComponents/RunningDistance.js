import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import * as geolib from 'geolib';

import textStyle from '../../../constants/textStyle';

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
export default RunningDistance;