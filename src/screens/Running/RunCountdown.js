import React, { useState, useEffect, BackHandler } from 'react';
import {  Dimensions, Modal, Text, View, StyleSheet } from 'react-native';

const {width, height} = Dimensions.get("window")

const RunningCountdown = (props) => {
    const countdown = props.countdown;
    const countdownMsg = props.countdownMsg;

    return (
        <Modal 
            visible={countdown}
            animationType={'fade'}
        >
            <View style={styles.background}>
                <Text style={styles.message}>Starting in ...</Text>
                <Text style={styles.countText}>{countdownMsg}</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    background:{
        backgroundColor:'#36393E', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    message:{
        color: '#7289DA',
        fontWeight: 'bold',
        fontSize: 0.02 * height,
    },
    countText:{
        fontSize: 0.2 * height,
        color: '#7289DA',
        fontWeight: 'bold',
    }
})
export default RunningCountdown;