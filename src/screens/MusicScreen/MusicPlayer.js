import React, { useState, useRef, useEffect } from 'react';
import {  Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Animated } from 'react-native';

import Controller from './components/ControlPanel';
//import * as Spotify from '../../../api/spotify/spotify_player_controls';


const SpotifyPlayer = props => {
    //Constants
    const {isPlaying, setIsPlaying, currentlyPlaying, setCurrentlyPlaying} = props;
    const playlistUri = props.defaultUri;

    // const updatePlaying = async () => {
    //   const track = await Spotify.currentPlayingTrack();
    //   if (track === undefined) {
    //     updatePlaying();
    //   } else {
    //     setCurrentlyPlaying(track);
    //   }
    // };
    // useEffect(() => {
    //     if (isPlaying) {
    //       updatePlaying();
    //     }
    // });

    //common methods
    const playHandler = async () => {
      //await Spotify.play(playlistUri);
      setIsPlaying(true);
    };
    const pauseHandler = () => {
      setIsPlaying(false);
      //Spotify.pause();
    };
    const previousHandler = async () => {
      //await Spotify.previous();
      setIsPlaying(true);
    };
    const nextHandler = async () => {
      //await Spotify.next();
      setIsPlaying(true);
    };
    return (
        <View style={styles.container}>
            <Controller
                isPlaying={isPlaying}
                currentlyPlaying={currentlyPlaying}
                play={playHandler}
                pause={pauseHandler}
                next={nextHandler}
                previous={previousHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 0.12 * Dimensions.get('window').height,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
    },
})

export default SpotifyPlayer;