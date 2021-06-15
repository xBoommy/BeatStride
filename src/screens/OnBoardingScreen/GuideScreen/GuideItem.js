import React from 'react';
import { View, Text, StyleSheet,Image, Dimensions } from 'react-native';

import color from '../../../constants/color';
const { width } = Dimensions.get('window');

export default GuideItem = ({item}) => {
    return (
        <View style={[styles.container, { width}]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]} />
            <View style={{flex: 0.3}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 100,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: color.primary,
        textAlign: 'center',
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
});
