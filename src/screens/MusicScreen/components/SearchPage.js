import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import { Button, TextInput, IconButton } from "react-native-paper";

import color from '../../../constants/color';

import PlaylistItem from './PlaylistItem';

//TBC later
import Spotify_Search from '../../../api/spotify/spotify_search';
import * as playlistActions from '../../../../SpotifyStore/playlist-actions';
import * as Firestore from '../../../api/firestore';

const {width, height} = Dimensions.get('window');

const SearchPage = props => {

  //All methods, constants maybe can be stored in a file, exported... eg. SearchPageFunctions.js
  const LIMIT = 10;
  const [searchTitle, setSearchTitle] = useState('');
  const offset = 0;
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();

  const getPlaylists = async () => {
    const newPlaylists = await Spotify_Search({
      offset: offset,
      limit: LIMIT,
      q: searchTitle,
    });
    //If no playlist found empty playlist [],
    setPlaylists(newPlaylists);
  };

  const titleChangeHandler = text => {
    setSearchTitle(text);
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.searchBarContainer}>
          <TextInput
            mode="outlined"
            label="Search Playlists..."
            keyboardType="default"
            style={{marginTop: 10, width: 0.7 * width}}
            placeholder="Name of playlist..."
            value={searchTitle}
            onChangeText={setSearchTitle}
            autoCapitalize="none"
            returnKeyType="default"
            onSubmitEditing={() => 
              {Keyboard.dismiss();
              getPlaylists();
              }}
            blurOnSubmit={false}
            right={<TextInput.Icon name="search-web" onPress={getPlaylists} />}
            theme={{
              colors: {primary: color.primary, underlineColor: 'transparent'},
            }}
          />
        
      </SafeAreaView>
      {/* Next/Previous page options... */}
      <FlatList
        numColumns={2}
        data={playlists}
        renderItem={({item}) => {
          return (
            //Need to be selectable...
            <TouchableOpacity onPress={() => onSelect(item)}>
              <PlaylistItem item={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  // buttonContainer: {
  //   height: 50,
  //   width: 0.2 * Dimensions.get('window').width,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderColor: 'black',
  //   borderWidth: 1,
  // },
  // textinput: {
  //   color: 'black',
  //   fontSize: 20,
  //   width: 0.68 * Dimensions.get('window').width,
  //   height: 50,
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   //padding: 10,
  // },
  searchBarContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      //backgroundColor: 'blue',
      width: 0.8 * width,
      alignItems: 'center',
  },
});

export default SearchPage;
