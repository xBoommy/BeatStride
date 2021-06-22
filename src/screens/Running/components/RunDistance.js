import React from 'react';
import {  SafeAreaView,  ScrollView,  StyleSheet,  Text,  View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window")

const RunDistance = (props) => {
    const distance = props.distance

    return (
        <View style={styles.componentContainer}>
            <Text numberOfLines={1} style={styles.text}>{(distance / 1000).toFixed(2)}</Text>
            <Text style={styles.subtext}>Total Distance (km)</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subtext:{
        fontSize: 14,
        color: '#BABBBF',
    },
})

export default RunDistance;