import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Screen from '../MainScreen';

import PlaylistItem from './components/PlaylistItem';
import MusicPlayerMain from './components/MusicPlayerMain';
import PlaylistSearch from './PlaylistSearch';
import * as Firestore from '../../api/firestore';
import Tracks_Getter from '../../api/spotify/spotify_tracks_getter';
import * as Spotify from './components/spotify_player_controls';

const {width, height} = Dimensions.get("window")


const MusicScreen = () => {
    const navigation = useNavigation();
    const [searchToggle, setSearchToggle] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [selectedPlaylistUri, setSelectedPlaylistUri] = useState('');

    useEffect(() => {
        Firestore.db_playlists(
            (playlists) => { setPlaylists(playlists) },
            (error) => {console.log('Failed to initiate playlist in music main')}
        );
        updatePlaying(); //To initialise the first thing loaded on Spotify
    }, []);

    useEffect(() => {
        if (isPlaying) {
            updatePlaying();
        }
    });
    navigation.addListener('beforeRemove', () => {
        if (isPlaying) {
          setIsPlaying(false);
          Spotify.pause();
        }
    });

    const getPlaylistDetails = async (playlistUri, title) => {
        setSelectedPlaylistUri(playlistUri);
        const tracks = await Tracks_Getter(playlistUri);
        navigation.navigate('SongScreen', { tracks: tracks, title: title});
    };

    const updatePlaying = async () => {
        const track = await Spotify.currentPlayingTrack();
        if (track === undefined) {
            updatePlaying();
        } else {
            setCurrentlyPlaying(track);
        }
    };

  return (
      <Screen>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Music</Text>
            </View>

            {/* Playlist List */}
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                numColumns={2}
                data={playlists}
                keyExtractor={item => item.id}
                renderItem={({item}) => <PlaylistItem 
                                            item={item}
                                            goToSongScreen={() => getPlaylistDetails(item.playlistUri, item.title)}
                                        />}
            />

            {/* Music Player */}
            <View style={styles.musicPlayer}>
                <MusicPlayerMain
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentlyPlaying={currentlyPlaying}
                    defaultUri={selectedPlaylistUri}
                />
            </View>
            
            {/* Playlist Search Popup */}
            <PlaylistSearch
                searchToggle={searchToggle}
                setSearchToggle={setSearchToggle}
            />

            {/* Playlist Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={() => {setSearchToggle(true)}}>
                <View>
                    <Image 
                        style={styles.searchIcon} 
                        source={require('../../assets/icons/add.png')}
                    />
                </View>
            </TouchableOpacity>
            
          
      </Screen>
  );
};

const styles = StyleSheet.create({
    header:{
        width: width,
        height: height * 0.1,
        justifyContent:'center',
        paddingHorizontal: '10%',
        backgroundColor: '#1e2124',
    },
    headerText:{
        color: '#BABBBF',
        fontSize: 28,
        fontWeight: 'bold',
        height: height * 0.1,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    list:{
    //    backgroundColor: 'pink',
    },
    listContent:{
        paddingBottom: height * 0.33
    },
    musicPlayer:{
        position: 'absolute',
        bottom: height * 0.21 ,
        alignSelf: 'center',
    },
    searchButton:{
        height: height * 0.1 * 0.6,
        aspectRatio: 1,
        position: 'absolute',
        top: height * 0.1 * 0.2,
        right: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    searchIcon:{
        height: height * 0.1 * 0.6 * 0.6, 
        aspectRatio: 1,
        tintColor: '#BABBBF'
    }
})

export default MusicScreen;