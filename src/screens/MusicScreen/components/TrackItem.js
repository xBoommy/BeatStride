import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text, Dimensions} from 'react-native';
import { Card } from 'react-native-elements';

import color from '../../../constants/color';

const {width, height} = Dimensions.get('window');

const TrackItem = props => {
  return (
    <Card containerStyle={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Image style={styles.trackImage} source={{uri: props.item.imageUri}} />
        <SafeAreaView style={styles.textView}>
          <Text numberOfLines={1} style={styles.trackTitle}>{props.item.title}</Text>
          {props.item.artist !== 'undefined' && <Text style={{color: color.secondary, fontSize: 0.018 * height}}>{props.item.artist}</Text>}
        </SafeAreaView>
      </SafeAreaView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 15,
    width: 0.9 * width,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackImage: {
    height: 0.1 * height,
    width: 0.1 * height,
    borderRadius: 0.01 * height,
  },
  trackTitle: {
    fontSize: 0.025 * height,
    fontWeight: 'bold',
  },
  textView: {
    width: 0.5 * width,
    marginLeft: 10,

  },
});

export default TrackItem;
