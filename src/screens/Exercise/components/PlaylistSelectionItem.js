import React, {useState} from 'react';
import {  TouchableOpacity,  StyleSheet,  Text,  View, Dimensions, Image } from 'react-native';

const {width, height} = Dimensions.get("window")


/**
 * This is a functional component representing a Playlist object on the PlaylistSelection pages.
 * Used in PlaylistSelectionBasic and PlaylistSelectionTempo.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const PlaylistSelectionItem = props => {

    const {inserted, insert, item} = props;
    const [highlight, setHighlight] = useState(false)

    return (
        <View style={{...styles.itemContainer , backgroundColor: (highlight ? '#7289DA' : '#36393E')}}>
            <TouchableOpacity onPress={() => {
                if (highlight) {
                    setHighlight(false)
                    // Remove from tracks
                    insert(inserted.filter(content => content.id !== item.id));
                } else {
                    setHighlight(true)
                    // Add to tracks
                    insert([...inserted, item]);
                } 
            }}>
                
                {/* Image */}
                <View style={styles.imageContainer}> 
                    {/* The style in the view redundant, shifted over to Image, else cant see */}
                    <Image style={styles.imageContainer} source={{uri: item.imageUri}} />
                </View>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {/* Title */}
                        {item.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.songs}>
                        {/* No. of songs */}
                        {item.totalSongs} Songs
                    </Text>
                </View>

            </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
    itemContainer:{
        width: width * 0.95 * 0.5, //
        height: height * 0.9 * 0.37,
        paddingHorizontal: width * 0.95 * 0.5 * 0.05,
        paddingVertical: height * 0.9 * 0.37 * 0.05,
        borderTopWidth: height * 0.9 * 0.37 * 0.025,
        borderBottomWidth: height * 0.9 * 0.37 * 0.025,
        borderLeftWidth: width * 0.95 * 0.5 * 0.025,
        borderRightWidth: width * 0.95 * 0.5 * 0.025,
        borderColor: '#36393E',
        alignItems: 'center',
   },
    imageContainer:{
        width: (width * 0.95 * 0.5) - (width * 0.95 * 0.5 * 0.1), //
        aspectRatio: 1,
        // backgroundColor: 'red',
   },
    textContainer:{
        height: height * 0.9* 0.37 - (height * 0.9 * 0.37 * 0.1) - ((width * 0.5) - (width * 0.5 * 0.1)),
        width: (width * 0.95 * 0.5) - (width * 0.95 * 0.5 * 0.1), //
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

export default PlaylistSelectionItem;
