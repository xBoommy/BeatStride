import React, {useState} from 'react';
import {  TouchableOpacity,  StyleSheet,  Text,  View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window")

const PlaylistItem = () => {

    const [highlight, setHighlight] = useState(false)

    return (
        <TouchableOpacity onPress={() => {}}>
            <View style={styles.itemContainer}>
            
                {/* Image Container*/}
                <View style={styles.imageContainer}>
                    {/* Image Here */}
                </View>
                
                {/* Text Container */}
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {/* Title Here*/}
                        Title
                    </Text>

                    <Text numberOfLines={1} style={styles.songs}>
                        {/* No. of songs Here*/}
                        xx Songs
                    </Text>
                </View>
            
            </View>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    itemContainer:{
        width: width * 0.5,
        height: height * 0.9 * 0.35,
        paddingHorizontal: width * 0.5 * 0.05,
        paddingVertical: height * 0.9 * 0.35 * 0.05,
        alignItems: 'center',
        backgroundColor: '#282b30',
   },
    imageContainer:{
        width: (width * 0.5) - (width * 0.5 * 0.1),
        aspectRatio: 1,
        backgroundColor: 'red',
   },
    textContainer:{
        height: height * 0.9* 0.35 - (height * 0.9 * 0.35 * 0.1) - ((width * 0.5) - (width * 0.5 * 0.1)),
        width: (width * 0.5) - (width * 0.5 * 0.1),
        alignItems: 'center',
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

export default PlaylistItem;