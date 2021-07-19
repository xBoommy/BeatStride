import React, {useState} from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, Modal, TouchableOpacity, Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SearchItem from './components/SearchItem';
import * as Firestore from '../../api/firestore';

const {width, height} = Dimensions.get("window")


const PersonalPlaylistSearch = (props) => {
    const searchToggle = props.searchToggle;
    const setSearchToggle = props.setSearchToggle;
    const playlists = props.playlists;

    const onSelect = (playlist) => {
        //do some alert/pop up, if ok then proceed with adding
        Alert.alert(
          'Add Playlist',
          'Are you sure that you want to add this playlist?',
          [
            {
              text: 'Cancel',
              onPress: () => Alert.alert('Cancelled'),
              style: 'default', //ignored on android...
            },
            {
              text: 'Ok',
              onPress: () => {
                //console.log(playlist);
                //dispatch(playlistActions.addPlaylist(playlist));
                Firestore.db_addUserPlaylists(playlist);
              },
              style: 'default', //ignored on android
            },
          ],
          {
            cancelable: true,
          }
        );
    };

    const importAllHandler = () => {
        for (let i = 0; i < playlists.length; i++) {
            Firestore.db_addUserPlaylists(playlists[i]);
        }
        console.log("All loaded!");
    }

    return (
        <Modal visible={searchToggle} transparent={true} animationType={'slide'}>
            <View style={styles.modal}>
                <View style={styles.searchContainer}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>Select your personal playlists to add them</Text>
                        <Text style={styles.headerText}>individually or simply import all at once</Text>
                    </View>

                    {/* Playlist List */}
                    <FlatList
                        showsVerticalScrollIndicator ={false}
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        numColumns={2}
                        data={playlists}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <SearchItem item={item} onSelect={() => onSelect(item)}/>}
                        ListEmptyComponent={
                            <View style={styles.emptyList}>
                                <View style={styles.emptyIcon}>
                                    <Icon name="search" size={height * 0.04} color="#72767D"/>
                                </View> 
                                <Text style={styles.emptyText}>Search for Playlists from Spotify</Text>
                            </View>
                        }
                    />

                    {/* Button Container */}
                    <View style={styles.buttonContainer}>
                        {/* Close Button */}
                        <TouchableOpacity onPress={() => {setSearchToggle(false)}}>
                            <View style={styles.closeButton}>
                                <Text style={styles.buttonText}>Close</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Import All Button */}
                        <TouchableOpacity onPress={importAllHandler}>
                            <View style={styles.closeButton}>
                                <Text style={styles.buttonText}>Import All</Text>
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
    header: {
        width: width * 0.9,
        height: height * 0.1,
        alignSelf: 'center',
        marginTop: height * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
        // backgroundColor: 'green',
    },
    headerText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#BABBBF',
    },
    list:{
        width: width * 0.95,
        height: height * 0.7,
    //    backgroundColor: 'pink',
    },
    listContent:{
        paddingBottom: (height * 0.13 * 0.4) + (height * 0.95 * 0.02)
    },
    emptyList: {
        width: width,
        height: height * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    emptyText:{
        fontSize: 14,
        color: '#72767D'
    },
    emptyIcon:{
        height: height * 0.07,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    buttonContainer:{
        width: width * 0.7,
        position: 'absolute',
        bottom: height * 0.95 * 0.02 ,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'green',
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
});

export default PersonalPlaylistSearch;
