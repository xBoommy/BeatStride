import React, { useState, useRef } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';

import TempoRun from './TempoRun';
import BasicRun from './BasicRun';
import CalibRun from './CalibRun';

const {width, height} = Dimensions.get("window")

const RunTab = () => {
    return (
        <View style={styles.contentContainer}>
            <TempoRun/>
            <BasicRun/>
            <CalibRun/>
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer:{
        width: width,
        height: height * 0.73,
        backgroundColor: '#282B30',
        justifyContent: 'space-around',
    },  
})

export default RunTab;