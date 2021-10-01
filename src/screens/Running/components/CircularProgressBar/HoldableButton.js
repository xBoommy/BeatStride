import React from 'react';
import { StyleSheet } from 'react-native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { eq, cond } from 'react-native-reanimated';
import { withTransition, usePanGestureHandler } from 'react-native-redash/lib/module/v1';

import Button from './components/Button';

/**
 * This is a functional component representing a holdable button.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const HoldableButton = ({radius, onSuccess, imageSource}) => {

    const { state, gestureHandler } = usePanGestureHandler();

    const isActive = eq(state, State.BEGAN);
    const duration = cond(isActive, 2000, 500);
    const progress = withTransition(isActive, {duration});

    return (
        // PasGestureHandler for Android
        
        <PanGestureHandler {...gestureHandler}>
            <Animated.View>
                <Button {...{progress}} radius={radius} imageSource={imageSource} onSuccess={() => onSuccess()} />
            </Animated.View>
        </PanGestureHandler>
        
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#E8EDFF",
      transform: [{rotate: '90 deg'}],
    },
});

export default HoldableButton;
