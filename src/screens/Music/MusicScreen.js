import React, { useState, useEffect } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Screen from '../MainScreen';

import PlaylistItem from './components/PlaylistItem';
import MusicPlayerMain from './components/MusicPlayerMain';
import PlaylistSearch from './PlaylistSearch';
import PersonalPlaylistSearch from './PersonalPlaylistSearch';
import * as Firestore from '../../api/firestore';
import Tracks_Getter from '../../api/spotify/spotify_tracks_getter';
import * as Spotify from './components/spotify_player_controls';
import spotify_personal_playlist from '../../api/spotify/spotify_personal_playlist';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing the main Screen on the Music Tab.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const MusicScreen = () => {
    const navigation = useNavigation();
    const [searchToggle, setSearchToggle] = useState(false);
    const [personalSearchToggle, setPersonalSearchToggle] = useState(false);
    const [personalPlaylists, setPersonalPlaylists] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [selectedPlaylistUri, setSelectedPlaylistUri] = useState('');

    /**
     * This is a render effect triggered on component mount.
     */
    useEffect(() => {
        Firestore.db_playlists(
            (playlists) => { setPlaylists(playlists) },
            (error) => {console.log('Failed to initiate playlist in music main')}
        );
        updatePlaying(); //To initialise the first thing loaded on Spotify
    }, []);

    /**
     * This is a constant render effect triggered upon component changes.
     */
    useEffect(() => {
        if (isPlaying) {
            updatePlaying();
        }
    });

    /**
     * This is an event listener to listen to track the music playing status of Spotify.
     */
    navigation.addListener('beforeRemove', () => {
        if (isPlaying) {
          setIsPlaying(false);
          Spotify.pause();
        }
    });

    /**
     * This is a method to obtain the obtain playlist tracks and navigate to 'SongScreen'.
     * @param {String} playlistUri  A link to the selected playlist.
     * @param {String} title        The title of the selected playlist.
     * @param {Number} totalSongs   The value of the number of tracks within the playlist.
     */
    const getPlaylistDetails = async (playlistUri, title, totalSongs) => {
        setSelectedPlaylistUri(playlistUri);
        const tracks = await Tracks_Getter(playlistUri, totalSongs);
        navigation.navigate('SongScreen', { tracks: tracks, title: title, currentlyPlaying: currentlyPlaying, isPlaying: isPlaying});
    };

    /**
     * This is a method to remove a playlist from library.
     * @param {Object} item The playlist item object.
     */
    const removePlaylist = (item) => {
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
        );
    };

    /**
     * This is a method to obtain & update the status of the Spotify player.
     */
    const updatePlaying = async () => {
        const track = await Spotify.currentPlayingTrack();
        if (track === undefined) {
            updatePlaying();
        } else {
            setCurrentlyPlaying(track);
        }
    };

    /**
     * This is a method to load the user's personal playlist from Spotify database.
     */
    const loadPersonalPlaylist = async () => {
        const personalPlaylist = await spotify_personal_playlist();
        if (personalPlaylist.length == 0) {
            console.log("No Playlists Available");
        } else {
            setPersonalPlaylists(personalPlaylist);
            setPersonalSearchToggle(true);
        }
    };

  return (
      <Screen>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Music</Text>

                {/* Icons */}
                <View style={styles.iconComponent}>
                    {/* Friend Request Icon */}
                    <TouchableOpacity style={styles.iconContainer} onPress={loadPersonalPlaylist}>
                        <MaterialCommunityIcons name="cloud-upload-outline" size={width * 0.09} color="#BABBBF"/>
                    </TouchableOpacity>

                    {/* Search Icon */}
                    <TouchableOpacity style={styles.iconContainer} onPress={() => {setSearchToggle(true)}}>
                        <Entypo name="plus" size={width * 0.1} color="#BABBBF"/>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Playlist List */}
            <FlatList
                showsVerticalScrollIndicator ={false}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                numColumns={2}
                data={playlists}
                keyExtractor={item => item.id}
                renderItem={({item}) => 
                    <PlaylistItem 
                        item={item}
                        goToSongScreen={() => getPlaylistDetails(item.playlistUri, item.title, item.totalSongs)}
                        removePlaylist={() => removePlaylist(item)}
                    />}
                ListEmptyComponent={
                    <View style={styles.emptyList}>
                        <View style={styles.emptyMessageContainer}>
                            <Text style={styles.emptyMainText}>No Playlists Added</Text>
                        </View>

                        <View style={styles.emptyMessageContainer}>
                            <MaterialCommunityIcons name="cloud-upload-outline" size={height * 0.045} color="#72767D"/>
                            <Text style={styles.emptyText}>Import/Update Your Personal Playlists</Text>
                        </View>

                        <View style={styles.emptyMessageContainer}>
                            <Entypo name="plus" size={height * 0.05} color="#72767D"/>
                            <Text style={styles.emptyText}>Search For Public Playlists</Text>
                        </View>
                        
                        
                    </View>
                }
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

            {/* Personal Playlist Selection Popup */}
            <PersonalPlaylistSearch
                searchToggle={personalSearchToggle}
                setSearchToggle={setPersonalSearchToggle}
                playlists={personalPlaylists}
                
            />
          
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
    iconComponent:{
        position: 'absolute',
        height: height * 0.1,
        width: width * 0.35,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    iconContainer:{
        width: width * 0.15,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    list:{
        width: width,
        height: height * 0.8,
        // backgroundColor: 'pink',
    },
    listContent:{
        paddingBottom: height * 0.14,
    },
    emptyList: {
        width: width,
        height: height * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: height * 0.14,
        // backgroundColor: 'red',
    },
    emptyMainText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#72767D'
    },
    emptyMessageContainer:{
        width: width,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    emptyText:{
        fontSize: 14,
        color: '#72767D'
    },
    musicPlayer:{
        position: 'absolute',
        bottom: height * 0.02 ,
        alignSelf: 'center',
    },
})

export default MusicScreen;
