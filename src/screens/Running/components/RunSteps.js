import React from 'react';
import {  SafeAreaView,  ScrollView,  StyleSheet,  Text,  View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window")

const RunSteps = (props) => {
    const steps = props.steps;

    return (
        <View style={styles.componentContainer}>
            <Text numberOfLines={1} style={styles.text}>{steps}</Text>
            <Text style={styles.subtext}>Steps</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subtext:{
        fontSize: 14,
        color: '#BABBBF',
    },
})

export default RunSteps