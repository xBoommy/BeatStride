import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity } from 'react-native';

const {width, height} = Dimensions.get("window")

const SongItem = () => {
    return (
        <TouchableOpacity onPress={() => {}}>
            <View style={styles.itemContainer}>
            
                {/* Image Container */}
                <View style={styles.imageContainer}>

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
            
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer:{
        width: width,
        height: height * 0.12,
        paddingHorizontal: height * 0.12 * 0.1,
        flexDirection: 'row',
        // backgroundColor: 'purple',
    },
    imageContainer:{
        height: height * 0.12 * 0.8,
        aspectRatio: 1,
        backgroundColor: 'yellow',
        alignSelf: 'center',
    },
    textContainer:{
        alignSelf: 'center',
        height: height * 0.12 * 0.7,
        width: width - (height * 0.12) , 
        justifyContent: 'center',
        paddingHorizontal: width * 0.35 * 0.15, 
        // backgroundColor: 'green',
    },
    title:{
        fontWeight: 'bold',
        fontSize: 14,
        color: '#BABBBF',
    },
    artist:{
        fontSize: 12,
        color: '#BABBBF',
    },
})
export default SongItem