import React, { useState, useRef, useEffect } from 'react';
import {  Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Button, Modal, TouchableOpacity, FlatList } from 'react-native';

import PlaylistPlayer from './components/PlaylistPlayer';
import TrackItem from './components/TrackItem';
import * as Spotify from './components/spotify_player_controls';

const MusicPlaylistSongs = props => {
    const tracks = props.route.params?.tracks ?? [];
    const mapper = new Map();
    for (let i = 0; i < tracks.length; i++) {
        //map id to their index
        //probably can remove, might have better way to get index
        mapper.set(tracks[i].id, i);
    }
    //const playlistUri = props.route.params?.playlistUri ?? 'undefined';
    //Temp
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [index, setIndex] = useState(0);
    const [duration, setDuration] = useState(tracks[0].duration);
    //Timer
    const [time, setTime] = useState(0);
    const [tick, setTick] = useState();
    /* [Tick every 1000ms increase time by 1 second] */
    const ticking = () => {
      setTime( (prevTime) => prevTime + 1000 )
    }
    const startTimer = () => {
        setTick( setInterval(ticking, 1000) );
    };
    const stopTimer = () => {
        clearInterval(tick);
    };

    const playAll = async () => {
        try {
          if (tracks.length === 0) {
            return;
          }
          stopTimer();
          setTime(0);
          setIndex(0);
          setDuration(tracks[0].duration);
          Spotify.playDirect(tracks[0].trackUri);
          startTimer();
          setIsPlaying(true);
        } catch (e) {
          console.error('Error in playAll in ListOfTracks: ', e);
        }
    };
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
    const playSong = async (id) => {
      console.log("Timer Start")
      if (tracks.length === 0) {
        return;
      }
      Spotify.playDirect(tracks[id].trackUri);
      setCurrentlyPlaying(tracks[id]);
      startTimer();
      setIsPlaying(true);
    };

    useEffect(()=>{
      //console.log('Time is:' + time);
      if (time > duration) {
        //console.log('Going next song...')
        setIsPlaying(false);
        nextSong();
      }
    },[time]);

    //PlaySpecific method
    const playSpecific = async (id) => {
        //can do map... Its fine I guess?
        try {
          //console.log('Id received is: ', id);
          const index = mapper.get(id);
          //console.log(index);
          //this index diff from outer scope index
          stopTimer();
          setTime(0);
          setIndex(index);
          setDuration(tracks[index].duration);
          await playSong(index);
        } catch (e) {
          console.error('Error with playSpecific:', e);
        }
    };

    return (
      <SafeAreaView style={styles.container}>

        {/* Playall Button */}
        <SafeAreaView style={styles.buttonTab}>
          <Button title="Play All" onPress={playAll} />
        </SafeAreaView>

        {/* Flatlist here */}
        <SafeAreaView style={styles.innerContainer}>
          <FlatList
            data={tracks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => playSpecific(item.id)}>
                <TrackItem item={item} />
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>

        {/* Spotify Player */}
        <PlaylistPlayer
          tracks={tracks}
          index={index}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentlyPlaying={currentlyPlaying}
          startTimer={startTimer}
          stopTimer={stopTimer}
          nextSong={nextSong}
          prevSong={prevSong}
        />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  innerContainer: {
    height: 0.7 * Dimensions.get('window').height,
  },
  buttonTab: {
    height: 0.08 * Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MusicPlaylistSongs;
