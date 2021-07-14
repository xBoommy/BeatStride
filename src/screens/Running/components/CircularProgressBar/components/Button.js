import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useCode, eq, cond, call } from 'react-native-reanimated';
import CircularProgress from './CircularProgress';

const {height} = Dimensions.get('window');

const Button = ({ progress, radius, onSuccess, imageSource }) => {

    useCode(() => cond(eq(progress, 1), call([], () => onSuccess())));

    const rad = radius;

    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {/* Circular Progress */}
            <View style={{transform: [{rotate: '90 deg'}]}}>
                <CircularProgress fg={'#7289DA'} bg={'#BABBBF'} {...{progress}} radius={rad} />
            </View>

            {/* Blank coloured circle to make it less of a "Full" circular progress */}
            <View style={styles.overlay}>
                <View style={{
                    height: (rad - 5) * 2,
                    width: (rad - 5) * 2,
                    borderRadius: rad,
                    backgroundColor: '#7289DA',
                }}/>
            </View>

            {/* Image Icon */}
            <View style={styles.overlay}>
                <Image 
                    source={imageSource}
                    resizeMode= 'contain'
                    style={styles.buttonIcon}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    buttonIcon:{
        height: height * 0.05,
        aspectRatio: 1,
        tintColor: '#BABBBF',
    },
});

export default Button;
