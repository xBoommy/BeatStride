import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

import * as Spotify from '../../Music/components/spotify_player_controls';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing the Music Player used during a run.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const MusicPlayer = props => {

    const runStatus = props.runStatus;

    const tracks = useSelector(state => state.playlists.tracksForRun);
    const [isPlaying, setIsPlaying] = useState(false);
    const [index, setIndex] = useState(0);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(tracks.length > 0 ? tracks[0] : undefined);
    const [duration, setDuration] = useState(tracks[0].duration);
    //Timer
    const [time, setTime] = useState(0);
    const [tick, setTick] = useState();

    /* [Tick every 500ms increase time by 0.5 second] */
    /**
     * This is a helper method for the increment of "time" state.
     */
    const ticking = () => {
        setTime( (prevTime) => prevTime + 500 );
    }

    /* [Start timing] */
    /**
     * This is a helper method to setup an interval function.
     */
    const startTimer = () => {
        setTick( setInterval(ticking, 500) );
    };

    /* [Stop timing] */
    /**
     * This is a helper method to clear the interval function. 
     */
    const stopTimer = () => {
        clearInterval(tick);
    };
  
    /**
     * This is a render effect based on "time" state.
     */
    useEffect(() => {
        //console.log('Time: ', time);
        if (time > duration) {
            setIsPlaying(false);
            nextSong();
        }
    },[time]);


    /**
     * This is a helper method to play music on Spotify.
     */
    const playSong = async (id) => {
        console.log("Timer Start")
        if (tracks.length === 0) {
          return;
        }
        await Spotify.playDirect(tracks[id].trackUri);
        setCurrentlyPlaying(tracks[id]);
        setDuration(tracks[id].duration);
        //console.log("Song duration: ", tracks[id].duration);
        startTimer();
        setIsPlaying(true);
    }

    /**
     * This is a helper method to pause music on Spotify.
     */
    const pause = async () => {
        await Spotify.pause();
        setIsPlaying(false);
    };

    /**
     * This is a helper method to resume music on Spotify.
     */
    const resume = async () => {
        await Spotify.play(tracks[index].trackUri);
        setIsPlaying(true);
    }

    /**
     * This is a method to skip to the next track in the playlist.
     */
    const nextSong = async () => {
        stopTimer();
        setTime(0);
        if (index === tracks.length - 1) {
            setIndex(0);
            playSong(0);
        } else {
            setIndex(prevIndex => prevIndex + 1);
            playSong(index + 1);
        }
    };

    /**
     * This is a method to skip to the previous track in the playlist.
     */
    const prevSong = async () => {
        stopTimer();
        setTime(0);
        if (index === 0) {
            setIndex(tracks.length - 1);
            playSong(tracks.length - 1);
        } else {
            setIndex(prevIndex => prevIndex - 1);
            playSong(index - 1);
        }
    };

    /* [RUN STATUS RENDER] */
    /**
     * This is a render effect based on "runStatus" state.
     */
    const [first, setFirst] = useState(true);
    useEffect(() => {
        if (runStatus == 2) {
            if (first) {
                setFirst(false);
                playSong(0);
            } else {
                startTimer();
                resume();
            }
        }
        if (runStatus == 3 || runStatus == 4 ) {
            stopTimer();
            pause();
        }
    }, [runStatus])


    return (
        <View style={styles.playerContainer}>

            {/* Image Container */}
            <View style={styles.imageContainer}>
                {/* Image Here */}
                {currentlyPlaying && <Image style={styles.imageContainer} source={{uri: currentlyPlaying.imageUri}}/>}
            </View>

            {/* Text Container */}
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    {/* Title Here*/}
                    {currentlyPlaying && currentlyPlaying.title}
                </Text>

                <Text numberOfLines={1} style={styles.artist}>
                    {/* Artist Here*/}
                    {currentlyPlaying && currentlyPlaying.artist}
                </Text>
            </View>

            {/* Button Container */}
            <View style={styles.buttonContainer}>
                {/* Skip Previous Button */}
                <TouchableOpacity onPress={prevSong}>
                    <View style={styles.skipButton}>
                        <Image
                            source={require('../../../assets/icons/previous.png')}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>

                
                {/* Play/Pause Button */}
                {isPlaying ? (
                    <TouchableOpacity onPress={pause}>
                        <View style={styles.playButton}>
                            <Image
                                source={require('../../../assets/icons/pause.png')}
                                resizeMode='contain'
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={resume}>
                        <View style={styles.playButton}>
                            <Image
                                source={require('../../../assets/icons/play.png')}
                                resizeMode='contain'
                                style={styles.playIcon}
                            />
                        </View>
                    </TouchableOpacity>
                )}

                {/* Skip Next Button */}
                <TouchableOpacity onPress={nextSong}>
                    <View style={styles.skipButton}>
                        <Image
                            source={require('../../../assets/icons/next.png')}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    playerContainer:{
        width: width * 0.9,
        height: height * 0.12,
        borderRadius: 5,
        paddingVertical: height * 0.12 * 0.1,
        paddingLeft: height * 0.12 * 0.1,
        backgroundColor: '#424549',
        flexDirection: 'row',
        // borderBottomWidth: height * 0.06,
        // borderBottomColor: 'yellow',
    },
    imageContainer:{
        height: height * 0.12 * 0.8,
        aspectRatio: 1,
        // backgroundColor: 'yellow',
    },
    textContainer:{
        alignSelf: 'center',
        height: height * 0.12 * 0.7,
        width: width * 0.35, 
        justifyContent: 'center',
        paddingHorizontal: width * 0.35 * 0.05, 
        // backgroundColor: 'purple',
    },
    title:{
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFFFFF',
    },
    artist:{
        fontSize: 12,
        color: '#BABBBF',
    },
    buttonContainer:{
        alignSelf: 'center',
        height: height * 0.12 * 0.8,
        width: width * 0.55 - (height * 0.12 * 0.8) - (height * 0.12 * 0.1), 
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    skipButton:{
        width: (width * 0.55 - (height * 0.12 * 0.8) - (height * 0.12 * 0.1)) * 0.325,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    playButton:{
        width: (width * 0.55 - (height * 0.12 * 0.8) - (height * 0.12 * 0.1)) * 0.35, 
        aspectRatio: 1,
        borderRadius: height,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#BABBBF',
        // backgroundColor: 'pink'
    },
    icon:{
        height: (width * 0.55 - (height * 0.12 * 0.8) - (height * 0.12 * 0.1)) * 0.325 * 0.6,
        aspectRatio: 1,
        tintColor: '#BABBBF',
    },
    playIcon:{
        height: (width * 0.55 - (height * 0.12 * 0.8) - (height * 0.12 * 0.1)) * 0.325 * 0.6,
        aspectRatio: 1,
        transform: [{translateX: width * 0.008}],
        tintColor: '#BABBBF',
    }
});

export default MusicPlayer;
