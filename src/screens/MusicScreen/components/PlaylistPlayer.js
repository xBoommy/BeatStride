import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Controller from '../components/ControlPanel';

import * as Spotify from '../components/spotify_player_controls';

const PlaylistPlayer = (props) => {

    const {
      tracks,
      index,
      isPlaying,
      setIsPlaying,
      currentlyPlaying,
      startTimer,
      stopTimer,
      nextSong,
      prevSong,
    } = props;

    const pause = async () => {
        setIsPlaying(false);
        await Spotify.pause();
        stopTimer();
    };
    const resume = async () => {
      await Spotify.play(tracks[index].trackUri);
      startTimer();
      setIsPlaying(true);
    }
    

  return (
    <View style={styles.container}>
      <Controller
        isPlaying={isPlaying}
        currentlyPlaying={currentlyPlaying}
        play={resume}
        pause={pause}
        next={nextSong}
        previous={prevSong}
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
});

export default PlaylistPlayer;
