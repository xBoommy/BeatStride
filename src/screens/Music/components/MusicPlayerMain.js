import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, TouchableOpacity } from 'react-native';

const {width, height} = Dimensions.get("window")

const MusicPlayer = () => {
    return (
        <View style={styles.playerContainer}>

            {/* Image Container */}
            <View style={styles.imageContainer}>
                {/* Image Here */}
            </View>

            {/* Text Container */}
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    {/* Title Here*/}
                    Title
                </Text>

                <Text numberOfLines={1} style={styles.artist}>
                    {/* Artist Here*/}
                    Artist
                </Text>
            </View>

            {/* Button Container */}
            <View style={styles.buttonContainer}>
                {/* Skip Previous Button */}
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.skipButton}>
                        {/* Icon Here 
                            resizeMode: 'contain'
                            style={styles.icon}
                        */}
                    </View>
                </TouchableOpacity>

                {/* Play/Pause Button */}
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.playButton}>
                        {/* Icon Here 
                            resizeMode: 'contain'
                            style={styles.icon}
                        */}
                    </View>
                </TouchableOpacity>

                {/* Skip Next Button */}
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.skipButton}>
                        {/* Icon Here 
                            resizeMode: 'contain'
                            style={styles.icon}
                        */}
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