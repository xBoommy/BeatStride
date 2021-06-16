import React from 'react';
import {View, SafeAreaView, StyleSheet, Image, Text} from 'react-native';

import color from '../../../constants/color';
import textStyle from '../../../constants/textStyle';

const PlaylistItem = props => {
  const noOfSongs = (props.item.totalSongs || "0");
  const num = noOfSongs.toString();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Image style={styles.image} source={{uri: props.item.imageUri}} />
        <SafeAreaView style={styles.text}>
          <Text numberOfLines={1} style={styles.title}>{props.item.title}</Text>
          <Text style={{color: color.secondary, ...textStyle.subtitle }}>{num} Songs</Text>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    //backgroundColor: 'orange',
    //borderRadius: 15,
    width: 160,
    alignItems: 'center',
    padding: 8,
  },
  innerContainer: {
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
  image: {
    height: 150,
    width: 150,    
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
