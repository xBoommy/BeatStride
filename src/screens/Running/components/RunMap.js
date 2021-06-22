import React from 'react';
import {  SafeAreaView,  ScrollView,  StyleSheet,  Text,  View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window")

const RunMap = () => {
    return (
        <View style={styles.componentContainer}>
            
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width,
        height: height * 0.7,
    },
})

export default RunMap;