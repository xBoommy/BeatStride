import React from 'react';
import { View, Text ,TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default () => {
    return (
        <View style={styles.container}>
            <Text>Achievements</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'cyan',
        width: 0.45 * width,
        height: 0.1 * height,
    },
})