import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import color from '../../../constants/color'

const {width, height} = Dimensions.get("window")

const ExerciseComponentStyles = StyleSheet.create({
    containerBuffer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    componentContainer:{
        // Container
        width: width-20,
        height: 0.7 * height,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        // borderWidth: 1,
        // borderColor: '#444',

        // Shadow
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,

        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer:{
        position:'absolute', 
        // backgroundColor:'purple',
        width: width - 20,
        height: 0.7 * height,
        borderRadius: 15,
        padding: 0.1 * width,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mapContainer:{
        borderRadius: 15,
        overflow: 'hidden',
    },
    mapStyle:{
        width: width - 20,
        height: 0.7 * height,
    },
    playButton:{
        position:'absolute',
        width: 100,
        height: 100,
        borderRadius:50,
        backgroundColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0.1 * height
    },
    playIcon:{
        width: 50,
        height: 50,
        tintColor: '#ffffff',
        transform: [{translateX:5}],
    },
})

export default ExerciseComponentStyles