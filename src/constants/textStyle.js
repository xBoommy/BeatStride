import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import color from './color';

const {width, height} = Dimensions.get("window")

const textStyle = StyleSheet.create({
    header: {
        fontSize: 0.04 * height,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 0.02 * height,
    },
    
}) 

export default textStyle