import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, Text, View, Image, Animated } from 'react-native';

import Controller from './components/ControlPanel';
import * as Spotify from './components/spotify_player_controls';


const SpotifyPlayer = props => {
    //Constants
    const {isPlaying, setIsPlaying, currentlyPlaying, setCurrentlyPlaying} = props;
    const playlistUri = props.defaultUri;

    //common methods
    const playHandler = async () => {
      await Spotify.play(playlistUri);
      setIsPlaying(true);
    };
    const pauseHandler = () => {
      setIsPlaying(false);
      Spotify.pause();
    };
    const previousHandler = async () => {
      await Spotify.previous();
      setIsPlaying(true);
    };
    const nextHandler = async () => {
      await Spotify.next();
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
        width: '100%',
        height: 80,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
    },
})

export default SpotifyPlayer;