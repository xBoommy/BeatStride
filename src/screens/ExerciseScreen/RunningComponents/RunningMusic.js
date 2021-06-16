import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View} from 'react-native';
import Controller from '../../MusicScreen/components/ControlPanel';
import { useNavigation } from '@react-navigation/native'; 

import * as Spotify from '../../MusicScreen/components/spotify_player_controls';
import { useSelector } from 'react-redux';

import color from '../../../constants/color';
import { opacity } from 'jimp';

const {width, height} = Dimensions.get("window")

const RunningMusic = (props) => {
  const navigation = useNavigation();

  const runStatus = props.runStatus;

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
  navigation.addListener('beforeRemove', () => {
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

  /* [RUN STATUS RENDER] */
  useEffect(() => {
    if (runStatus == 2){
      playHandler();
    }
    if (runStatus == 3){
      pauseHandler();
    }
    if (runStatus == 4 ){
      pauseHandler();
    }
  }, [runStatus])


  return (
    <View style={{
      position: 'absolute',
      height: 0.125 * height,
      width: width,
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems:'center',
      bottom: 0.03 * height,

    }}>
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
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        height: '99%',
        width: '95%',
        elevation: 10,
        backgroundColor: "#EEEEEE",
        borderRadius: 15,
    },
});

export default RunningMusic;
