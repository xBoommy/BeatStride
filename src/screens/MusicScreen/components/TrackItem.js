import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text, Dimensions} from 'react-native';
import { Card } from 'react-native-elements';

const TrackItem = props => {
  return (
    <Card containerStyle={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Image style={styles.trackImage} source={{uri: props.item.imageUri}} />
        <SafeAreaView>
          <Text style={styles.trackTitle}>{props.item.title}</Text>
          {props.item.artist !== 'undefined' && <Text>By: {props.item.artist}</Text>}
        </SafeAreaView>
      </SafeAreaView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 15,
    width: 0.9 * Dimensions.get('window').width,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  trackImage: {
    height: 75,
    width: 75,
  },
  trackTitle: {
    //textAlign: 'center',
  },
});

export default TrackItem;
