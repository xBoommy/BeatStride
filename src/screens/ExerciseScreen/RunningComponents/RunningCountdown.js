import React, { useState, useEffect, BackHandler } from 'react';
import {  Dimensions, Modal, Text, View, StyleSheet } from 'react-native';

import color from '../../../constants/color';

const {width, height} = Dimensions.get("window")

const RunningCountdown = (props) => {
    const countdown = props.countdown;
    const countdownMsg = props.countdownMsg;

    return (
        <Modal 
            visible={countdown}
            animationType={'fade'}
        >
            <View style={{
                // backgroundColor:'blue', 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center'
            }}>
                <Text style={styles.message}>Starting in ...</Text>
                <Text style={styles.countText}>{countdownMsg}</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    message:{
        color: color.primary,
        fontWeight: 'bold',
        fontSize: 0.02 * height,
    },
    countText:{
        fontSize: 0.2 * height,
        color: color.primary,
        fontWeight: 'bold',
    }
})
export default RunningCountdown;