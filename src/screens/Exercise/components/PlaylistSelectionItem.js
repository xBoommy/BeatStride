import React, {useState} from 'react';
import {  TouchableOpacity,  StyleSheet,  Text,  View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window")

const MusicItem = () => {

    const [highlight, setHighlight] = useState(false)

    return (

        <View style={{...styles.itemContainer , backgroundColor: (highlight ? '#7289DA' : '#36393E')}}>
            <TouchableOpacity onPress={() => {
                if (highlight) {
                    setHighlight(false)
                    // Remove from tracks
                } else {
                    setHighlight(true)
                    // Add to tracks
                } 
            }}>
                

                {/* Image */}
                <View style={styles.imageContainer}/>
                

                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {/* Title */}
                        Title
                    </Text>
                    <Text numberOfLines={1} style={styles.songs}>
                        {/* No. of songs */}
                        xx Songs
                    </Text>
                </View>

            </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
    itemContainer:{
        width: width * 0.95 * 0.5, //
        height: height * 0.9 * 0.35,
        paddingHorizontal: width * 0.95 * 0.5 * 0.05,
        paddingVertical: height * 0.9 * 0.35 * 0.05,
        borderTopWidth: height * 0.9 * 0.35 * 0.025,
        borderBottomWidth: height * 0.9 * 0.35 * 0.025,
        borderLeftWidth: width * 0.95 * 0.5 * 0.025,
        borderRightWidth: width * 0.95 * 0.5 * 0.025,
        borderColor: '#36393E',
        alignItems: 'center',
   },
    imageContainer:{
        width: (width * 0.95 * 0.5) - (width * 0.95 * 0.5 * 0.1), //
        aspectRatio: 1,
        backgroundColor: 'red',
   },
    textContainer:{
        height: height * 0.9* 0.35 - (height * 0.9 * 0.35 * 0.1) - ((width * 0.5) - (width * 0.5 * 0.1)),
        width: (width * 0.95 * 0.5) - (width * 0.95 * 0.5 * 0.1), //
        alignItems: 'center',
        // backgroundColor: 'yellow',
   },
    title:{
        fontSize: 18,
        fontWeight:'bold',
        color: '#BABBBF',
        textAlignVertical: 'center',
        height: ( (height * 0.9 * 0.35) - (height * 0.9 * 0.35 * 0.1) - ((width * 0.5) - (width * 0.5 * 0.1)) ) * 0.65,
        // backgroundColor: 'blue',
   },
   songs:{
        fontSize: 12,
        color: '#72767D',
        includeFontPadding: false,
        textAlignVertical: 'center',
        height: ( (height * 0.9 * 0.35) - (height * 0.9 * 0.35 * 0.1) - ((width * 0.5) - (width * 0.5 * 0.1)) ) * 0.35,
        // backgroundColor: 'purple',
        // borderWidth: 1,
        // borderColor: 'purple',
    },

})

export default MusicItem;