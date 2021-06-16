import React from 'react';
import {View, SafeAreaView, StyleSheet, Image, Text, Dimensions} from 'react-native';

import color from '../../../constants/color';
import textStyle from '../../../constants/textStyle';
const {width, height} = Dimensions.get('window');

const PlaylistItem = props => {
  const noOfSongs = (props.item.totalSongs || "0");
  const num = noOfSongs.toString();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Image style={styles.image} source={{uri: props.item.imageUri}} />
        <SafeAreaView style={styles.text}>
          <Text numberOfLines={1} style={styles.title}>{props.item.title}</Text>
          <Text style={{color: color.secondary, fontSize: 0.018 * height}}>{num} Songs</Text>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    //backgroundColor: 'orange',
    //borderRadius: 15,
    width: 0.45 * width,
    alignItems: 'center',
    padding: 0.01 * height,
  },
  innerContainer: {
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.42 * width,
  },
  image: {
    height: 0.42 * width,
    width: 0.42 * width,

    
  },
  title: {
    ...textStyle.title
  },
  text:{
    ...textStyle.subtitle,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

export default PlaylistItem;
