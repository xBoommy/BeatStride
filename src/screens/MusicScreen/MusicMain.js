import React, { useState, useRef, useEffect } from 'react';
import {  Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as playlistActions from '../../../SpotifyStore/playlist-actions';
import PlaylistItem from './components/PlaylistItem';
import MusicPlayer from './MusicPlayer';
import MusicPlaylistSearch from './MusicPlaylistSearch';
import Tracks_Getter from '../../api/spotify/spotify_tracks_getter';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';


const {width, height} = Dimensions.get("window")

const MusicMain = ({navigation}) => {

    const [popToggle, setPopToggle] = useState(false);

    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists.playlists);
    useEffect(() => {
        dispatch(playlistActions.loadPlaylists());
    }, [dispatch]);

    const [selectedPlaylistUri, setSelectedPlaylistUri] = useState('');
    const getPlaylistDetails = async (playlistUri) => {
        setSelectedPlaylistUri(playlistUri);
        const tracks = await Tracks_Getter(playlistUri);
        navigation.navigate('MusicPlaylistSongs', { tracks: tracks, playlistUri: playlistUri});
    };

    //For SpotifyPlayer
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const playNextAndPrevHandler = () => {
      setIsPlaying(true);
    }
    // navigation.addListener('beforeRemove', () => {
    //   if (isPlaying) {
    //     setIsPlaying(false);
    //     //Spotify.pause();
    //   }
    // });


    return (
      <Screen>
        <Text style={textStyle.header}>MusicMain</Text>
        <View
          style={{
            alignItems: 'center',
            //backgroundColor:'blue'
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: 0.95 * width,
              height: 0.62 * height,
              borderRadius: 15,
              elevation: 5,
              top: 0.01 * height,
            }}>
            <FlatList
              data={playlists}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => getPlaylistDetails(item.playlistUri)}>
                    <PlaylistItem item={item} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          <View
            style={{
              backgroundColor: '#CCC',
              width: 0.95 * width,
              height: 0.1 * height,
              borderRadius: 15,
              elevation: 5, 
              top: 0.05 * height,
            }}>
            <MusicPlayer
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentlyPlaying={currentlyPlaying}
              setCurrentlyPlaying={setCurrentlyPlaying}
              defaultUri={selectedPlaylistUri}

              play={playNextAndPrevHandler}
              next={playNextAndPrevHandler}
              previous={playNextAndPrevHandler}
            />
          </View>

          {/* Add Playlist Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setPopToggle(true)}></TouchableOpacity>

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
      width: 0.1 * Dimensions.get('window').height,
      height: 0.1 * Dimensions.get('window').height,
      borderRadius: 0.1 * Dimensions.get('window').height / 2,
      backgroundColor: 'black',
      bottom: 0.13 * Dimensions.get('window').height,
      right: 0.01 * Dimensions.get('window').height,
      elevation: 10,
  },
});

export default MusicMain;