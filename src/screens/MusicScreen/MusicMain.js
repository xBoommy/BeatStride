import React, { useState, useRef, useEffect } from 'react';
import {  Dimensions, Alert, ScrollView, StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';

import PlaylistItem from './components/PlaylistItem';
import MusicPlayer from './MusicPlayer';
import MusicPlaylistSearch from './MusicPlaylistSearch';
import Tracks_Getter from '../../api/spotify/spotify_tracks_getter';
import * as Spotify from './components/spotify_player_controls';
import * as Firestore from '../../api/firestore';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';
import color from '../../constants/color';


const {width, height} = Dimensions.get("window")

const MusicMain = ({navigation}) => {

    const [popToggle, setPopToggle] = useState(false);

    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
      Firestore.db_playlists(
          (playlists) => { setPlaylists(playlists)},
          (error) => {console.log('Failed to initiate playlist in music main')}
      );
    }, [])

    const [selectedPlaylistUri, setSelectedPlaylistUri] = useState('');
    const getPlaylistDetails = async (playlistUri) => {
        setSelectedPlaylistUri(playlistUri);
        const tracks = await Tracks_Getter(playlistUri);
        navigation.navigate('MusicPlaylistSongs', { tracks: tracks, playlistUri: playlistUri});
    };

    //For SpotifyPlayer
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();

    navigation.addListener('beforeRemove', () => {
      if (isPlaying) {
        setIsPlaying(false);
        //Spotify.pause();
      }
    });
    const updatePlaying = async () => {
      const track = await Spotify.currentPlayingTrack();
      if (track === undefined) {
        updatePlaying();
      } else {
        setCurrentlyPlaying(track);
      }
    };
    useEffect(() => {
        if (isPlaying) {
          updatePlaying();
        }
    });


    return (
      <Screen>
        <Text style={textStyle.header}>Music</Text>
        <View
          style={{
            alignItems: 'center',
            //backgroundColor:'blue'
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              height: 0.62 * height,
              borderRadius: 15,
              elevation: 5,
              top: 7,
            }}>
            <FlatList
              numColumns={2}
              style={{width: width - 20}}
              contentContainerStyle={{alignItems: 'center'}}
              data={playlists}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => getPlaylistDetails(item.playlistUri)} 
                    onLongPress={() => 
                      Alert.alert(
                      'Delete Playlist',
                      'Are you sure that you want to remove this playlist?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {},
                          style: 'default', //ignored on android...
                        },
                        {
                          text: 'Ok',
                          onPress: () => {
                            Firestore.db_removeUserPlaylists(item);
                          },
                          style: 'default', //ignored on android
                        },
                      ],
                      {
                        cancelable: true,
                      }
                    )}>
                    <View>
                      <PlaylistItem item={item} />
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#CCC',
              width: width - 20,
              height: 0.1 * height,
              borderRadius: 15,
              elevation: 5,
              top: 30,
            }}>
            <MusicPlayer
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
              defaultUri={selectedPlaylistUri}
            />
          </View>

          {/* Add Playlist Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setPopToggle(true)}>
              <Image source={require('../../assets/icons/add.png')} style={{resizeMode: 'contain', width: 45, height: 45, tintColor: color.primary }} />
          </TouchableOpacity>

          {/* PopUp upon selecting "Add" */}
          <MusicPlaylistSearch
            popToggle={popToggle}
            setPopToggle={setPopToggle}
          />
        </View>
      </Screen>
    );
};

const styles = StyleSheet.create({
  addButton:{
      position: 'absolute',
      width: 65,
      height: 65,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 32.5,
      backgroundColor: 'white',
      bottom: 0.13 * height,
      right: 0.01 * height,
      elevation: 10,
  },
});

export default MusicMain;