import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import color from '../../constants/color';
import textStyle from '../../constants/textStyle';

import Tracks_Getter from '../../api/spotify/spotify_tracks_getter';
const {width} = Dimensions.get('window');

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
            <Text numberOfLines={1} style={textStyle.title}>
              {props.item.title}
            </Text>
            <Text style={{color: color.secondary, ...textStyle.subtitle}}>
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
    width: 0.5 * width - 15,
    alignItems: 'center',
    padding: 10,
  },
  innerContainer: {
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 200,
  },
  image: {
    height: 145,
    width: 145,
  },
  text:{
    width: 135,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

export default SelectablePlaylistItem;
