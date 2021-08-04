import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolateNode,
  lessThan,
  multiply,
} from "react-native-reanimated";

import SemiCircle from "./SemiCircle";

/**
 * This is a functional component representing circular progress bar that makes up the holdable button.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const CircularProgress = ({ progress, bg, fg, radius }) => {
    const PI = Math.PI;

    const theta = multiply(progress, 2 * PI);
    const opacity = lessThan(theta, PI);

    const rotateTop = interpolateNode(theta, {
        inputRange: [0, PI],
        outputRange: [0, PI],
        extrapolate: Extrapolate.CLAMP,
    });

    const rotateBot = interpolateNode(theta, {
        inputRange: [PI, 2 * PI],
        outputRange: [0, PI],
        extrapolate: Extrapolate.CLAMP,
    })

    const styles = StyleSheet.create({
      animatedTop: {
        ...StyleSheet.absoluteFillObject,
        transform: [
          {translateY: radius / 2},
          {rotate: rotateTop},
          {translateY: -radius / 2},
        ],
      },
      animatedBot: {
        ...StyleSheet.absoluteFillObject,
        transform: [
            {translateY: radius / 2},
            {rotate: rotateBot},
            {translateY: -radius / 2},
          ],
      },
    });

    return (
      <View>
        <View style={{zIndex: 1}}>
            <SemiCircle color={bg} radius={radius} />
            <Animated.View style={styles.animatedTop} opacity={opacity}>
                <SemiCircle color={fg} radius={radius} />
            </Animated.View>
        </View>
        <View style={{transform: [{rotate: '180deg'}]}}>
            <SemiCircle color={bg} radius={radius} />
            <Animated.View style={styles.animatedBot}>
                <SemiCircle color={fg} radius={radius} />
            </Animated.View>
        </View>
      </View>
    );
};



export default CircularProgress;
