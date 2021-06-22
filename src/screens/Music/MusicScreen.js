import React, { useState } from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity } from 'react-native';

import Screen from '../MainScreen';

import PlaylistItem from './components/PlaylistItem';
import MusicPlayerMain from './components/MusicPlayerMain';
import PlaylistSearch from './PlaylistSearch';

const {width, height} = Dimensions.get("window")

// For Testing Purpose - Remove before use
const playlists = [
    {id: 1, name : 1},
    {id: 2, name : 2},
    {id: 3, name : 3},
    {id: 4, name : 4},
    {id: 5, name : 5},
    {id: 6, name : 6},
    {id: 7, name : 7},
]

const MusicScreen = () => {
    const [searchToggle, setSearchToggle] = useState(false)

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
                renderItem={({item}) => <PlaylistItem/>}
            />

            {/* Music Player */}
            <View style={styles.musicPlayer}>
                <MusicPlayerMain/>
            </View>
            
            {/* Playlist Search Popup */}
            <PlaylistSearch
                searchToggle={searchToggle}
                setSearchToggle={setSearchToggle}
            />

            {/* Playlist Search Button */}
            <TouchableOpacity style={styles.searchButton} onPress={() => {setSearchToggle(true)}}>
                <View>
                    {/* Insert Plus Icon Here */}
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
        backgroundColor: 'green',
        position: 'absolute',
        top: height * 0.1 * 0.2,
        right: width * 0.05,
    }
})

export default MusicScreen;