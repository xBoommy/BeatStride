import React from 'react';
import { View, Text ,TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import textStyle from '../../../constants/textStyle';

const {width, height} = Dimensions.get('window');

export default () => {
    return (
        <View style={styles.container}>
            <Text style={textStyle.title}>Achievements</Text>
            <View style={styles.innerContainer}>
                <Text style={textStyle.subtitle}>Complete 10km in less than 40minutes</Text>
                <Text style={textStyle.subtitle}>Complete 5km in less than 20minutes</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: width - 60,
        height: 0.15 * height,
        elevation: 5,
        alignItems: 'center'
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})