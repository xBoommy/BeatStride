import React, {} from 'react';
import {  Dimensions, StyleSheet, View, Animated } from 'react-native';

import color from '../../constants/color'

const {width, height} = Dimensions.get("window")

export default TabIndicator = ({scrollX}) => {
     const IndicatorWidth = scrollX.interpolate({
        inputRange: [ 0 , width, 2* width],
        outputRange: [73, 63 , 50],
    });

    const translateX = scrollX.interpolate({
        inputRange: [ 0 , width, 2* width],
        outputRange: [0.185 * width, 0.45 * width , 0.685 * width ],
    })


    return (
        <Animated.View 
            style={{
                ...styles.dot, 
                width: IndicatorWidth,
                position:'absolute',
                transform: [{translateX: translateX}],
                left: 0,
        }}/>
    )
};

const styles = StyleSheet.create({
    dot: {
        height: 5,
        borderRadius: 5,
        backgroundColor: color.primary,
        // marginHorizontal: 8,
    },
});