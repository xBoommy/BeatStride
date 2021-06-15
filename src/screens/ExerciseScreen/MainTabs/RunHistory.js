import React, { useState, useEffect } from 'react';
import {  Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

import ExerciseComponentStyles from './ExerciseComponentStyles';

const RunHistory = () => {
    return (
        <View style={ExerciseComponentStyles.containerBuffer}>
            <View style={ExerciseComponentStyles.componentContainer}>

                {/* Section Content */}
                <View style={ExerciseComponentStyles.contentContainer}>
                    <Text>RunHistory</Text>
                </View>
                
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
   
})
export default RunHistory