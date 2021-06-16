import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import color from '../../constants/color';
import Tracks_Getter from '../../api/spotify/spotify_tracks_getter';
const {width, height} = Dimensions.get('window');

const SelectablePlaylistItem = props => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(false);

  const insert = props.insert; //function
  const inserted = props.inserted; //const

  const getPlaylistDetails = async playlistUri => {
    const tracks = await Tracks_Getter(playlistUri);
    navigation.navigate('MusicPlaylistSongs', {
      tracks: tracks,
      playlistUri: playlistUri,
    });
  };


  const noOfSongs = (props.item.totalSongs || "0");
  const num = noOfSongs.toString();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback 
      onPress={() => {
          if (selected) {
            insert(inserted.filter(content => content.id !== props.item.id));
            setSelected(false);
            
          } else {
            insert([...inserted, props.item]);
            setSelected(true);
          }
        }}
      onLongPress={() => getPlaylistDetails(props.item.playlistUri)}>
        <SafeAreaView
          style={{
            ...styles.innerContainer,
            backgroundColor: selected ? 'orange' : 'white',
          }}>
          <Image style={styles.image} source={{uri: props.item.imageUri}} />
          <SafeAreaView style={styles.text}>
            <Text numberOfLines={1} style={styles.title}>
              {props.item.title}
            </Text>
            <Text style={{color: color.secondary, fontSize: 0.018 * height}}>
              {num} Songs
            </Text>
          </SafeAreaView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    //backgroundColor: 'pink',
    //borderRadius: 15,
    width: 0.45 * width,
    alignItems: 'center',
    padding: 0.01 * height,
  },
  innerContainer: {
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.43 * width,
    height: 0.3 * height,
  },
  image: {
    height: 0.4 * width,
    width: 0.4 * width,

    
  },
  title: {
    fontSize: 0.03 * height,
    fontWeight: 'bold',
  },
  text:{
    width: 0.36 * width,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

export default SelectablePlaylistItem;
