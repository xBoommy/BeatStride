import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text} from 'react-native';
import { Card } from 'react-native-elements';

import color from '../../../constants/color';
import textStyle from '../../../constants/textStyle';


const TrackItem = props => {
  return (
    <Card containerStyle={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Image style={styles.trackImage} source={{uri: props.item.imageUri}} />
        <SafeAreaView style={styles.textView}>
          <Text numberOfLines={1} style={textStyle.title}>{props.item.title}</Text>
          {props.item.artist !== 'undefined' && <Text style={{color: color.secondary, ...textStyle.subtitle}}>{props.item.artist}</Text>}
        </SafeAreaView>
      </SafeAreaView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 15,
    width: 325,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackImage: {
    height: 70,
    width: 70,
    borderRadius: 7,
  },
  textView: {
    width: 175,
    marginLeft: 10,

  },
});

export default TrackItem;
