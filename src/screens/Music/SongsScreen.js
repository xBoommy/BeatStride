import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity } from 'react-native';

import SongItem from './components/SongItem';
import MusicPlayerPlaylist from './components/MusicPlayerPlaylist';

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
    {id: 8, name : 8},
    {id: 9, name : 9},
    {id: 10, name : 10},
]

const SongsScreen = () => {
    return (
        <SafeAreaView style={styles.screen}>

            {/* Playlist Header Container */}
            <View style={styles.headerContainer}>

                {/* Playlist title */}
                <Text numberOfLines={1} style={styles.headerTitle}>
                    {/* Playlist title Here */}
                    Playlist Title
                </Text>

                {/* No of songs in playlist */}
                <Text numberOfLines={1} style={styles.headerSubtitle}>
                    {/* No. of Songs Here */}
                    xx Songs
                </Text>

                {/* Play All Button */}
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.playAllButton}>
                        <Text style={styles.playAllText}>Play All</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Songs List */}
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                numColumns={1}
                data={playlists}
                keyExtractor={item => item.id}
                renderItem={({item}) => <SongItem/>}
            />        

            {/* Music Player */}
            <View style={styles.musicPlayer}>
                <MusicPlayerPlaylist/>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen:{
        width: width,
        height: height,
        backgroundColor: '#282b30',
    },
    headerContainer:{
        width: width,
        height: height * 0.15,
        paddingVertical: height * 0.1 * 0.1,
        backgroundColor: 'blue',
    },
    headerTitle:{
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
        color: '#BABBBF',
    },
    headerSubtitle:{
        fontSize: 14,
        alignSelf: 'center',
        paddingBottom: height * 0.1 * 0.1,
        color: '#BABBBF',
    },
    playAllButton:{
        width: width * 0.3,
        height: height * 0.13 * 0.4,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7289DA',
    },
    playAllText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    list:{
        // backgroundColor: 'pink',
    },
    listContent:{
        paddingBottom: height * 0.14
    },
    musicPlayer:{
        position: 'absolute',
        bottom: height * 0.01,
        alignSelf: 'center',
    },
})

export default SongsScreen