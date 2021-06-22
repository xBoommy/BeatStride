import React, {useState, useEffect} from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity } from 'react-native';

import SongItem from './components/SongItem';
import MusicPlayerPlaylist from './components/MusicPlayerPlaylist';
import * as Spotify from './components/spotify_player_controls';

const {width, height} = Dimensions.get("window")


const SongsScreen = props => {

    const tracks = props.route.params?.tracks ?? [];
    const title = props.route.params?.title ?? '';
    const currPlaying = props.route.params?.currentlyPlaying ?? null; //passed from main screen
    const playerState = props.route.params?.isPlaying ?? false; //facilitate smooth transition
    const mapper = new Map();
    for (let i = 0; i < tracks.length; i++) {
        //map id to their index
        //probably can remove, might have better way to get index
        mapper.set(tracks[i].id, i);
    }


    const [isPlaying, setIsPlaying] = useState(playerState);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(currPlaying);
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
          setCurrentlyPlaying(tracks[0]);
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
        <SafeAreaView style={styles.screen}>

            {/* Playlist Header Container */}
            <View style={styles.headerContainer}>

                {/* Playlist title */}
                <Text numberOfLines={1} style={styles.headerTitle}>
                    {/* Playlist title Here */}
                    {title}
                </Text>

                {/* No of songs in playlist */}
                <Text numberOfLines={1} style={styles.headerSubtitle}>
                    {/* No. of Songs Here */}
                    {tracks.length} Songs
                </Text>

                {/* Play All Button */}
                <TouchableOpacity onPress={playAll}>
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
                data={tracks}
                keyExtractor={item => item.id}
                renderItem={({item}) => <SongItem item={item} playThis={() => playSpecific(item.id)}/>}
            />        

            {/* Music Player */}
            <View style={styles.musicPlayer}>
                <MusicPlayerPlaylist
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
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen:{
        width: width,
        height: height * 0.92,
        backgroundColor: '#282b30',
    },
    headerContainer:{
        width: width,
        height: height * 0.15,
        paddingVertical: height * 0.1 * 0.1,
        // backgroundColor: 'blue',
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
        height : height * 0.77,
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