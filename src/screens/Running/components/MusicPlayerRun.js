import React, {useState, useEffect} from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import * as Spotify from '../../Music/components/spotify_player_controls';

const {width, height} = Dimensions.get("window")

const MusicPlayer = props => {

    const runStatus = props.runStatus;

    const tracks = useSelector(state => state.playlists.tracksForRun);
    const [isPlaying, setIsPlaying] = useState(false);
    const [index, setIndex] = useState(0);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(tracks.length > 0 ? tracks[0] : undefined);
    const [duration, setDuration] = useState(tracks.length > 0 ? tracks[0].duration : 0);
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
  
    useEffect(()=>{
        if (time > duration) {
            setIsPlaying(false);
            nextSong();
        }
    },[time]);

    /* [Start timing] */
    const playSong = async (id) => {
        console.log("Timer Start")
        if (tracks.length === 0) {
          return;
        }
        await Spotify.playDirect(tracks[id].trackUri);
        setCurrentlyPlaying(tracks[id]);
        startTimer();
        setIsPlaying(true);
    }
    const pause = async () => {
        await Spotify.pause();
        setIsPlaying(false);
    };
    const resume = async () => {
        await Spotify.play(tracks[index].trackUri);
        setIsPlaying(true);
    }
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

    /* [RUN STATUS RENDER] */
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
})

export default MusicPlayer