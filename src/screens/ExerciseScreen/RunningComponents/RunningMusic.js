import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Controller from '../../MusicScreen/components/ControlPanel';
import { useNavigation } from '@react-navigation/native'; 

import * as Spotify from '../../MusicScreen/components/spotify_player_controls';
import { useSelector } from 'react-redux';

import color from '../../../constants/color';
import textStyle from '../../../constants/textStyle';

const RunningMusic = (props) => {
    const navigation = useNavigation();

    const runStatus = props.runStatus;

    const tracks = useSelector(state => state.playlists.tracksForRun);
    const [isPlaying, setIsPlaying] = useState(false);
    const [index, setIndex] = useState(0);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(tracks[0]);
    const [duration, setDuration] = useState(tracks[0].duration);
  
    //Timer
    const [time, setTime] = useState(0);
    const [tick, setTick] = useState();

    /* [Tick every 1000ms increase time by 1 second] */
    const ticking = () => {
        setTime( (prevTime) => prevTime + 1000 )
    }

    const startTimer = () => {
        if (!isPlaying){
            setTick( setInterval(ticking, 1000) );
        }
    };

    const stopTimer = () => {
      clearInterval(tick);
    };

    useEffect(()=>{
      if (time > duration) {
        setIsPlaying(false);
        nextSong();
      }
    },[time]);

    /* [Start timing] */
    const playSong = async (id) => {
        console.log("Timer Start")
        if (tracks.length === 0) {
          return;
        }
        await Spotify.playDirect(tracks[id].trackUri);
        startTimer();
        setIsPlaying(true);
    }
    const pause = async () => {
        await Spotify.pause();
        stopTimer();
        setIsPlaying(false);
    };
    const resume = async () => {
      await Spotify.play(tracks[index].trackUri);
      startTimer();
      setIsPlaying(true);
    }
    const nextSong = async () => {
        stopTimer();
        setTime(0);
        if (index === tracks.length - 1) {
          setDuration(tracks[0].duration);
          setIndex(0);
          playSong(0);
        } else {
          setDuration(tracks[index + 1].duration);
          setIndex(prevIndex => prevIndex + 1);
          playSong(index + 1);
        }
    };
    const prevSong = async () => {
      stopTimer();
      setTime(0);
      if (index === 0) {
        setDuration(tracks[tracks.length - 1].duration);
        setIndex(tracks.length - 1);
        playSong(tracks.length - 1);
      } else {
        setDuration(tracks[index - 1].duration);
        setIndex(prevIndex => prevIndex - 1);
        playSong(index - 1);
      }
    };

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
    stopTimer();
    Spotify.pause();
  });

  /* [RUN STATUS RENDER] */
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (runStatus == 2) {
      if (first) {
        setFirst(false);
        playSong(0);
      } else {
        resume();
      }
    }
    if (runStatus == 3) {
      pause();
    }
    if (runStatus == 4 ) {
      pause();
    }

  }, [runStatus])


  return (
    <View style={{
      position: 'absolute',
      height: 80,
      width: '100%',
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems:'center',
      bottom: 20,

    }}>
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
