import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native';
import { auth as SpotifyAuth,  remote as SpotifyRemote } from 'react-native-spotify-remote';

import Screen from '../MainScreen';
import RunTab from './components/RunTab';
import HistoryTab from './components/HistoryTab';

import * as Spotify from '../Music/components/spotify_player_controls';

const {width, height} = Dimensions.get("window")

const ExerciseScreen = () => {

    useEffect(async() => {
        const spotifyConfig = Spotify.spotifyConfig

        const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
        if (!isConnected) {
            const session = await SpotifyAuth.authorize(spotifyConfig);
            await SpotifyRemote.connect(session.accessToken);
        }
    }, [])

    const [scrollRef , setScrollRef] = useState(null)

    const scrollHandler = (num) => {
        scrollRef.scrollTo({
            x: width * num,
            animated: true
    })};

    const scrollX = useRef(new Animated.Value(0)).current;

    const RunIndicator = scrollX.interpolate({
        inputRange: [ 0 , width],
        outputRange: [ '#282B30', '#424549'],
    });
    const HistoryIndicator = scrollX.interpolate({
        inputRange: [ 0 , width],
        outputRange: [ '#424549', '#282B30'],
    });
    const RunHighlight = scrollX.interpolate({
        inputRange: [ 0 , width],
        outputRange: [ '#FFFFFF', '#424549'],
    });
    const HistoryHighlight = scrollX.interpolate({
        inputRange: [ 0 , width],
        outputRange: [ '#424549', '#FFFFFF'],
    });


    return (
        <Screen title={"Exercise"}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Exercise</Text>
            </View>

            {/* Tab Indicator */}
            <View style={styles.tabIndicator}>

                <View style={{flexDirection: 'row'}}>
                  {/* Run Tab */}
                  <TouchableWithoutFeedback onPress={() => scrollHandler(0)}>
                      <View>
                          <Animated.View style={{...styles.tab, backgroundColor: RunIndicator}}>
                              <Text style={styles.tabText}>Run</Text>
                          </Animated.View>

                          <Animated.View style={{...styles.tabHighlight, backgroundColor: RunHighlight,}}/>
                      </View>
                  </TouchableWithoutFeedback>

                  {/* History Tab */}
                  <TouchableWithoutFeedback onPress={() => scrollHandler(1)}>
                      <View>
                          <Animated.View style={{...styles.tab, backgroundColor: HistoryIndicator}}>
                              <Text style={styles.tabText}>History</Text>
                          </Animated.View>

                          <Animated.View style={{...styles.tabHighlight, backgroundColor: HistoryHighlight,}}/>
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
                <RunTab/>
                <HistoryTab/>
            </Animated.ScrollView>


        </Screen>
    );
};

const styles = StyleSheet.create({
    header:{
        width: width,
        height: height * 0.1,
        justifyContent:'center',
        paddingHorizontal: '10%',
        backgroundColor: '#1e2124',
    },
    headerText:{
        color: '#BABBBF',
        fontSize: 28,
        fontWeight: 'bold',
        height: height * 0.1,
        includeFontPadding: false,
        textAlignVertical: 'center',
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
        backgroundColor: 'green',
        height: height * 0.73,
    },
})

export default ExerciseScreen;