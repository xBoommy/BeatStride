import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';


/**
 * This is a functional component representing the page numbers on the Guide pages.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
export default PageIndicator = ({ data, scrollX }) => {
    const { width } = Dimensions.get('window');
    
    return (
        <View style={{flexDirection: 'row', height: 64, }}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1)* width];//prev dot, curr dot, next dot
                
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp', //Can try comment out this line
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp', //Can try comment out this line
                });

                return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()}/>
            })}     
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#7289DA',
        marginHorizontal: 8,
    },
});
