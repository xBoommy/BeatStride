import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import color from './color';

const {width, height} = Dimensions.get("window")

const textStyle = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 14,
    },
    title:{
        fontSize: 18,
        fontWeight:'bold',
    },
    subtitle: {
        fontSize: 12,
    },
    title2:{
        fontSize: 16,
        fontWeight:'bold',
    },
    subtitle2:{
        fontSize: 10,
    }
    
}) 

export default textStyle