import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text, Dimensions} from 'react-native';
import { Card } from 'react-native-elements';

import color from '../../../constants/color';
const {width, height} = Dimensions.get('window');

const PlaylistItem = props => {
  const noOfSongs = (props.item.totalSongs || "0.0");
  const num = noOfSongs.substr(0, noOfSongs.length - 2);
  return (
    <Card containerStyle={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Image style={styles.image} source={{uri: props.item.imageUri}} />
        <SafeAreaView style={styles.text}>
          <Text numberOfLines={1} style={styles.title}>{props.item.title}</Text>
          <Text style={{color: color.secondary, fontSize: 0.018 * height}}>{num} Songs</Text>
        </SafeAreaView>
      </SafeAreaView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 15,
    width: 0.38 * width,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 0.15 * height,
    width: 0.15 * height,
    borderRadius: 0.015 * height,
    marginBottom: 10,
  },
  title: {
    fontSize: 0.03 * height,
    fontWeight: 'bold',
  },
  text:{
    width: 0.36 * width,
    alignItems: 'center'
  }
});

export default PlaylistItem;
