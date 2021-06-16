import React, {} from 'react';
import {  Dimensions, StyleSheet, View, Animated } from 'react-native';

import color from '../../constants/color'

const {width, height} = Dimensions.get("window")

export default TabIndicator = (props) => {
    const scrollX = props.scrollX;
    const id = props.id;

    const TempoWidth = scrollX.interpolate({
        inputRange: [-width, 0 , width],
        outputRange: [0, 0.112*height, 0],
        extrapolate: 'clamp', //Can try comment out this line
    });
    const BasicWidth = scrollX.interpolate({
        inputRange: [0, width , 2*width],
        outputRange: [0, 0.1*height, 0],
        extrapolate: 'clamp', //Can try comment out this line
    });
    const HistoryWidth = scrollX.interpolate({
        inputRange: [width, 2*width, 3*width],
        outputRange: [0, 0.07*height, 0],
        extrapolate: 'clamp', //Can try comment out this line
    });

    return (
        <Animated.View 
            style={[styles.dot, { width: (id == "Tempo") ?  TempoWidth : ((id == "Basic") ? BasicWidth : HistoryWidth)}]}/>
    )
};

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: color.primary,
        marginHorizontal: 8,
    },
});