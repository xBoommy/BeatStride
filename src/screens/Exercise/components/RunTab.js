import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';

import TempoRun from './TempoRun';
import BasicRun from './BasicRun';
import CalibRun from './CalibRun';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing the Run Tab on the Exercise page.
 * It contains the TempoRun, BasicRun, CalibrationRun components.
 * 
 * @author NTU CZ2006 Team Alpha
 */
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
