import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, Modal, TouchableOpacity } from 'react-native';

import SearchItem from './components/SearchItem';

const {width, height} = Dimensions.get("window")

// For Testing Purpose - Remove before use
const playlists = [
    {id: 1, name : 1},
    {id: 2, name : 2},
    {id: 3, name : 3},
    {id: 4, name : 4},
    {id: 5, name : 5},
    {id: 6, name : 6},
    {id: 7, name : 7},
]

const PlaylistSearch = (props) => {
    const searchToggle = props.searchToggle;
    const setSearchToggle = props.setSearchToggle;

    return (
        <Modal visible={searchToggle} transparent={true} animationType={'slide'}>
            <View style={styles.modal}>
                <View style={styles.searchContainer}>

                    {/* Search Bar */}
                    <View style={styles.searchBar}>

                    </View>

                    {/* Playlist List */}
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        numColumns={2}
                        data={playlists}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <SearchItem/>}
                    />

                    {/* Button Container */}
                    <View style={styles.buttonContainer}>
                        {/* Close Button */}
                        <TouchableOpacity onPress={() => {setSearchToggle(false)}}>
                            <View style={styles.closeButton}>
                                <Text style={styles.buttonText}>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal:{
        width: width,
        height: height,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    searchContainer:{
        width: width * 0.95,
        height: height * 0.8,
        borderRadius: 5,
        backgroundColor: '#36393E',
    },
    searchBar: {
        width: width * 0.9,
        height: height * 0.08,
        backgroundColor: 'green',
        alignSelf: 'center',
        marginTop: height * 0.01,
    },
    list:{
    //    backgroundColor: 'pink',
    },
    listContent:{
        paddingBottom: (height * 0.13 * 0.4) + (height * 0.95 * 0.02)
    },
    buttonContainer:{
        position: 'absolute',
        bottom: height * 0.95 * 0.02 ,
        alignSelf: 'center',
    },
    closeButton:{
        width: width * 0.3,
        height: height * 0.13 * 0.4,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7289DA',
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})
export default PlaylistSearch