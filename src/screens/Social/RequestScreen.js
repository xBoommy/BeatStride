import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet,  Text,  View, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';

import RequestsTab from './components/RequestsTab';
import PendingTab from './components/PendingTab';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing main screen when an user view their request screen.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const RequestScreen = () => {

    /* SCROLL ANIMATIONS */
    const [scrollRef , setScrollRef] = useState(null)

    const scrollHandler = (num) => {
        scrollRef.scrollTo({
            x: width * num,
            animated: true
    })};

    const scrollX = useRef(new Animated.Value(0)).current;

    const RequestIndicator = scrollX.interpolate({
        inputRange: [ 0 , width],
        outputRange: [ '#282B30', '#424549'],
    });
    const PendingIndicator = scrollX.interpolate({
        inputRange: [ 0 , width],
        outputRange: [ '#424549', '#282B30'],
    });
    const RequestHighlight = scrollX.interpolate({
        inputRange: [ 0 , width],
        outputRange: [ '#FFFFFF', '#424549'],
    });
    const PendingHighlight = scrollX.interpolate({
        inputRange: [ 0 , width],
        outputRange: [ '#424549', '#FFFFFF'],
    });

    return (
        <SafeAreaView style={styles.screen}>
            {/* Tab Indicator */}
            <View style={styles.tabIndicator}>

                <View style={{flexDirection: 'row'}}>
                  {/* Requests Tab */}
                  <TouchableWithoutFeedback onPress={() => scrollHandler(0)}>
                      <View>
                          <Animated.View style={{...styles.tab, backgroundColor: RequestIndicator}}>
                              <Text style={styles.tabText}>Requests</Text>
                          </Animated.View>

                          <Animated.View style={{...styles.tabHighlight, backgroundColor: RequestHighlight,}}/>
                      </View>
                  </TouchableWithoutFeedback>

                  {/* Pending Tab */}
                  <TouchableWithoutFeedback onPress={() => scrollHandler(1)}>
                      <View>
                          <Animated.View style={{...styles.tab, backgroundColor: PendingIndicator}}>
                              <Text style={styles.tabText}>Pending</Text>
                          </Animated.View>

                          <Animated.View style={{...styles.tabHighlight, backgroundColor: PendingHighlight,}}/>
                      </View>
                  </TouchableWithoutFeedback>
                </View>
                
            </View>

            <Animated.ScrollView
                style={styles.scrollview}
                ref={ref => setScrollRef(ref)}
                horizontal
                snapToInterval={width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                bounces={false}
                overScrollMode="never"
                disableIntervalMomentum={true}
                onScroll={Animated.event( [{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false} )}
            >
                <RequestsTab/>
                <PendingTab/>
            </Animated.ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen:{
        width: width,
        height: height,
        backgroundColor: '#282b30',
    },
    tabIndicator:{
        width: width,
        height: height * 0.07,
        backgroundColor: '#1e2124',
        overflow: 'hidden',
    },
    tab:{
        width: width * 0.5,
        height: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    tabText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#BABBBF',
    },
    tabHighlight:{
        width: height * 0.02,
        height: height * 0.02,
        borderRadius: height,
        position: 'absolute',
        alignSelf: 'center',
        transform: [{translateY: -(height * 0.01) }]
    },
    scrollview:{
        height: height * 0.83,
        // backgroundColor: 'green',
    },
});

export default RequestScreen;
