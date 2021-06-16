import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import Controller from './ControlPanel';

import * as Spotify from './spotify_player_controls';
import { useSelector } from 'react-redux';

const RunningPlayer = props => {

  const tracks = useSelector(state => state.playlists.tracksForRun);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(tracks[0]);//initialise with the first
  //used Once
  const [firstTime, setFirstTime] = useState(true);
  //testing
  const [indexPlaying, setIndexPlaying] = useState(0);


  const updatePlaying = async () => {
    //need to call this method on changing songs...
    const track = await Spotify.currentPlayingTrack();
    if (track === undefined) {
      updatePlaying();
    } else if (track !== currentlyPlaying) {
      setCurrentlyPlaying(track);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      updatePlaying();
    }
  });

  //Needs to shift to the page that contains the player... in some exercise page (gps tracking page)
  props.navigation.addListener('beforeRemove', () => {
    setIsPlaying(false);
    Spotify.pause();
  });

  //Player methods... different from Full Playlist side...
  const playHandler = async () => {
    if (tracks.length === 0) {
      return;
    }
    if (firstTime) {
      await Spotify.queueTracks(tracks);
      await Spotify.next();
      setFirstTime(false); //Very crucial, need to be before setting isPlaying to true
      setIsPlaying(true);
    } else {
      await Spotify.play(tracks[indexPlaying].trackUri);
      setIsPlaying(true);
      //setCurrentlyPlaying(tracks[indexPlaying]);
    }
  };
  const pauseHandler = async () => {
    if (tracks.length === 0) {
      return;
    }
    setIsPlaying(false);
    await Spotify.pause();
  };

  const previousHandler = async () => {
  };

  const nextHandler = async () => {
    if (tracks.length === 0) {
      return;
    }
    await Spotify.next();
    setIsPlaying(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Controller
        isPlaying={isPlaying}
        currentlyPlaying={currentlyPlaying}
        play={playHandler}
        pause={pauseHandler}
        next={nextHandler}
        previous={previousHandler}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: Dimensions.get('window').width,
    },
});

export default RunningPlayer;
