import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native';

const {width, height} = Dimensions.get("window")

const SongItem = props => {
    return (
        <TouchableOpacity onPress={props.playThis}>
            <View style={styles.itemContainer}>
            
                {/* Image Container */}
                <View style={styles.imageContainer}>
                    {/* Image style added, else cannot see */}
                    <Image style={styles.imageContainer} source={{uri: props.item.imageUri}} />
                </View>

                {/* Text Container */}
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                        {/* Title Here*/}
                        {props.item.title}
                    </Text>

                    <Text numberOfLines={1} style={styles.artist}>
                        {/* Artist Here*/}
                        {props.item.artist}
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
        // backgroundColor: 'yellow',
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