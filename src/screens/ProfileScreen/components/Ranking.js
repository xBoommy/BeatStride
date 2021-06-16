import React from 'react';
import { View, Text ,TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import textStyle from '../../../constants/textStyle';

const {width, height} = Dimensions.get('window');

export default () => {
    return (
        <View style={styles.container}>
            {/* <Text style={{fontSize: 0.02 * height}}>Highest Ever:</Text> */}
            <View style={styles.bestRankContainer}>
                <Text style={styles.bestRankText}>National level: 5178th</Text>
                <Text style={styles.bestRankText}>Regional level: 1007th</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: width - 60,
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
        ...textStyle.title
    }
})