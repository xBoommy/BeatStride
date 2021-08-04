import React from 'react';
import {  TouchableOpacity,  StyleSheet,  Text,  View, Dimensions, Image } from 'react-native';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing the playlist objects.
 * It is used to render the list of saved playlist on the main page of Music Tab.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
const PlaylistItem = props => {

    return (
        <TouchableOpacity onPress={props.goToSongScreen} onLongPress={props.removePlaylist}>
            <View style={styles.itemContainer}>
            
                {/* Image Container*/}
                <View style={styles.imageContainer}>
                    {/* Image Here */}
                    {/* Styling from view brought down to Image, else cannot see image */}
                    <Image style={styles.imageContainer} source={{uri: props.item.imageUri}} />
                </View>
                
                {/* Text Container */}
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {/* Title Here*/}
                        {props.item.title}
                    </Text>

                    <Text numberOfLines={1} style={styles.songs}>
                        {/* No. of songs Here*/}
                        {props.item.totalSongs} Songs
                    </Text>
                </View>
            
            </View>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    itemContainer:{
        width: width * 0.5,
        height: height * 0.9 * 0.37,
        paddingHorizontal: width * 0.5 * 0.05,
        paddingVertical: height * 0.9 * 0.37 * 0.05,
        alignItems: 'center',
        backgroundColor: '#282b30',
   },
    imageContainer:{
        width: (width * 0.5) - (width * 0.5 * 0.1),
        aspectRatio: 1,
        // backgroundColor: 'red',
   },
    textContainer:{
        height: height * 0.9* 0.37 - (height * 0.9 * 0.37 * 0.1) - ((width * 0.5) - (width * 0.5 * 0.1)),
        width: (width * 0.5) - (width * 0.5 * 0.1),
        alignItems: 'center',
        // backgroundColor: 'yellow',
   },
    title:{
        fontSize: 18,
        fontWeight:'bold',
        color: '#BABBBF',
        textAlignVertical: 'center',
        height: ( (height * 0.9 * 0.37) - (height * 0.9 * 0.37 * 0.1) - ((width * 0.5) - (width * 0.5 * 0.1)) ) * 0.65,
        // backgroundColor: 'blue',
   },
   songs:{
        fontSize: 12,
        color: '#72767D',
        includeFontPadding: false,
        textAlignVertical: 'center',
        height: ( (height * 0.9 * 0.37) - (height * 0.9 * 0.37 * 0.1) - ((width * 0.5) - (width * 0.5 * 0.1)) ) * 0.35,
        // backgroundColor: 'purple',
        // borderWidth: 1,
        // borderColor: 'purple',
    },

})

export default PlaylistItem;
