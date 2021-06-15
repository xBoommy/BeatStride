import React, { useState, useRef, useEffect } from 'react';
import {  Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Button, Modal, TouchableOpacity, FlatList } from 'react-native';

import MusicPlayer from './MusicPlayer';
import TrackItem from './components/TrackItem';

const MusicPlaylistSongs = props => {
    const tracks = props.route.params?.tracks ?? [];
    const playlistUri = props.route.params?.playlistUri ?? 'undefined';
    //Temp
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);

    props.navigation.addListener('beforeRemove', () => {
        if (isPlaying) {
          setIsPlaying(false);
          //Spotify.pause();
        }
    });
    const playAll = () => {
        // try {
        //     Spotify.playDirect(playlistUri);
        setIsPlaying(true);
        setCurrentlyPlaying(tracks[0]);
        setCurrentIndex(0);
        // } catch (e) {
        //     console.error('Error in playAll in ListOfTracks: ', e);
        // }
    };

    const playHandler = () => {
      setCurrentlyPlaying(tracks[currentIndex]);
      setIsPlaying(true);
    }
    const nextHandler = () => {
      if (currentIndex === tracks.length - 1) {
        setCurrentIndex(0);
        setCurrentlyPlaying(tracks[0]);
        setIsPlaying(true);
      } else {
        setCurrentIndex(currentIndex + 1);
        setCurrentlyPlaying(tracks[currentIndex + 1]);
        setIsPlaying(true);
      }
    }
    const previousHandler = () => {
      if (currentIndex === 0) {
        setCurrentIndex(tracks.length - 1);
        setCurrentlyPlaying(tracks[tracks.length - 1]);
        setIsPlaying(true);
      } else {
        setCurrentIndex(currentIndex - 1);
        setCurrentlyPlaying(tracks[currentIndex - 1]);
        setIsPlaying(true);
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        {/* PASTE CONTENT HERE */}

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
              <TouchableOpacity>
                <TrackItem item={item} />
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
        <Text>Songs</Text>

        {/* Spotify Player */}
        <MusicPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
          defaultUri={playlistUri}

          play={playHandler}
          next={nextHandler}
          previous={previousHandler}
        />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    height: 0.7 * Dimensions.get('window').height,
  },
  buttonTab: {
    height: 0.15 * Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MusicPlaylistSongs;
