import React, { useState, useRef } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';

import TempoRun from './TempoRun';
import BasicRun from './BasicRun';
import CalibRun from './CalibRun';

const {width, height} = Dimensions.get("window")

const RunTab = () => {
    return (
        <ScrollView 
            style={styles.contentContainer}
            contentContainerStyle={{height: height * 0.73, justifyContent: 'space-around'}}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
        >
            
            <TempoRun/>
            <BasicRun/>
            <CalibRun/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer:{
        width: width,
        height: height * 0.73,
        backgroundColor: '#282B30',
    },  
})

export default RunTab;