import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';

import * as Spotify from './spotify_player_controls';

const {width, height} = Dimensions.get("window")

const MusicPlayer = props => {

    const {isPlaying, setIsPlaying, currentlyPlaying} = props;
    const playlistUri = props.defaultUri;

    //Controls
    const playHandler = async () => {
        await Spotify.play(playlistUri);
        setIsPlaying(true);
    };
    const pauseHandler = () => {
        setIsPlaying(false);
        Spotify.pause();
    };
    const previousHandler = async () => {
        await Spotify.previous();
        setIsPlaying(true);
    };
    const nextHandler = async () => {
        await Spotify.next();
        setIsPlaying(true);
    };

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
                <TouchableOpacity onPress={previousHandler}>
                    <View style={styles.skipButton}>
                        {/* Icon Here 
                            resizeMode: 'contain'
                            style={styles.icon}
                        */}
                        <Image
                            source={require('../../../assets/icons/previous.png')}
                            resizeMode='contain'
                            style={styles.icon}
                            //style={{...styles.icon, height: 30, width: 30}}
                        />
                    </View>
                </TouchableOpacity>

                
                {/* Play/Pause Button */}
                {isPlaying ? (
                    <TouchableOpacity onPress={pauseHandler}>
                        <View style={styles.playButton}>
                            {/* Icon Here 
                                resizeMode: 'contain'
                                style={styles.icon}
                            */}
                            <Image
                                source={require('../../../assets/icons/pause.png')}
                                resizeMode='contain'
                                style={styles.icon}
                                //style={{...styles.icon, height: 30, width: 30}}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={playHandler}>
                        <View style={styles.playButton}>
                            {/* Icon Here 
                                resizeMode: 'contain'
                                style={styles.icon}
                            */}
                            <Image
                                source={require('../../../assets/icons/play.png')}
                                resizeMode='contain'
                                style={styles.icon}
                                //style={{...styles.icon, height: 30, width: 30}}
                            />
                        </View>
                    </TouchableOpacity>
                )}

                {/* Skip Next Button */}
                <TouchableOpacity onPress={nextHandler}>
                    <View style={styles.skipButton}>
                        {/* Icon Here 
                            resizeMode: 'contain'
                            style={styles.icon}
                        */}
                        <Image
                            source={require('../../../assets/icons/next.png')}
                            resizeMode='contain'
                            style={styles.icon}
                            //style={{...styles.icon, height: 30, width: 30}}
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
        backgroundColor: 'purple',
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
        backgroundColor: 'green',
    },
    playButton:{
        width: (width * 0.55 - (height * 0.12 * 0.8) - (height * 0.12 * 0.1)) * 0.35, 
        aspectRatio: 1,
        borderRadius: height,
        borderWidth: 3,
        borderColor: '#BABBBF',
        // backgroundColor: 'pink'
    },
    icon:{
        tintColor: '#BABBBF',
    },
})

export default MusicPlayer