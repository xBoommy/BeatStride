import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';
import color from '../../constants/color';

import Tracks_Getter from '../../api/spotify/spotify_tracks_getter';
import PlaylistItem from '../MusicScreen/components/PlaylistItem';
import * as playlistActions from '../../../SpotifyStore/playlist-actions';

const {width, height} = Dimensions.get("window");

const PreRunSelection = props => {
    const navigation = useNavigation();
    const playlists = useSelector(state => state.playlists.playlists);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(playlistActions.loadPlaylists());
    }, [dispatch]);

    
    const getPlaylistDetails = async playlistUri => {
      const tracks = await Tracks_Getter(playlistUri);
      navigation.navigate('MusicPlaylistSongs', {
        tracks: tracks,
        playlistUri: playlistUri,
      });
    };
    
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Pre Run Playlist Selection</Text>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: 0.95 * width,
            height: 0.72 * height,
            borderRadius: 15,
            elevation: 5,
          }}>
          <FlatList
            data={playlists}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => getPlaylistDetails(item.playlistUri)}>
                  <PlaylistItem item={item} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
};

export default PreRunSelection;
