import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as Spotify from '../components/spotify_player_controls';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing the Music Player within SongsScreen.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const MusicPlayer = props => {
    const {
        tracks,
        index,
        isPlaying,
        setIsPlaying,
        currentlyPlaying,
        startTimer,
        stopTimer,
        nextSong,
        prevSong,
    } = props;
  
    const pause = async () => {
          setIsPlaying(false);
          await Spotify.pause();
          stopTimer();
    };
    const resume = async () => {
        await Spotify.play(tracks[index].trackUri);
        startTimer();
        setIsPlaying(true);
    };

    return (
        <SafeAreaView style={styles.playerContainer}>

            {/* Image Container */}
            <View style={styles.imageContainer}>
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


        </SafeAreaView>
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
