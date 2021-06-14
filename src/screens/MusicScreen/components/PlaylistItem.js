import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text, Dimensions} from 'react-native';
import { Card } from 'react-native-elements';

const PlaylistItem = props => {
  return (
    <Card containerStyle={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Image style={styles.SafeAreaViewImage} source={{uri: props.item.imageUri}} />
        <SafeAreaView>
          <Text style={styles.SafeAreaViewTitle}>{props.item.title}</Text>
          {props.item.artist !== 'undefined' && <Text>By: {props.item.artist}</Text>}
        </SafeAreaView>
      </SafeAreaView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 15,
    width: 0.86 * Dimensions.get('window').width,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  SafeAreaViewImage: {
    height: 100,
    width: 100,
  },
  SafeAreaViewTitle: {
    //textAlign: 'center',
  },
});

export default PlaylistItem;
