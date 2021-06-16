import React from 'react';
import { View, Text ,TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export default () => {
    return (
        <View style={styles.container}>
            {/* <Text style={{fontSize: 0.02 * height}}>Highest Ever:</Text> */}
            <View style={styles.bestRankContainer}>
                <Text style={styles.bestRankText}>National level: 12th</Text>
                <Text style={styles.bestRankText}>Regional level: 3rd</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: 0.9 * width,
        height: 0.15 * height,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 5,
    },
    bestRankContainer: {
        alignItems: 'center',
        paddingTop: 0.01 * height,
    },
    bestRankText: {
        fontSize: 0.04 * height,
    }
})