import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window")

const RunningMusic = () => {
    return (
        <View style={styles.container}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 0.256 * height - 40,
        width: 0.9 * width,
        bottom: 0,
        backgroundColor: 'red',
    },
})

export default RunningMusic;