import React from 'react';
import { View, Text ,TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default () => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 0.025 * height}}>Achievements</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: 0.9 * width,
        height: 0.15 * height,
        elevation: 5,
        alignItems: 'center'
    },
})