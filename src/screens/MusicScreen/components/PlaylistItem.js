import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text, Dimensions} from 'react-native';
import { Card } from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const PlaylistItem = props => {
  return (
    <Card containerStyle={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Image style={styles.image} source={{uri: props.item.imageUri}} />
        <SafeAreaView style={{width: 0.41 * width}}>
          <Text numberOfLines={1} style={styles.title}>{props.item.title}</Text>
        </SafeAreaView>
      </SafeAreaView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container:{
    borderRadius: 15,
    width: 0.43 * width,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 0.15 * height,
    width: 0.15 * height,
    borderRadius: 0.015 * height,
  },
  title: {
    fontSize: 0.03 * height,
    //fontWeight: '800',
  },
  text:{
    
  }
});

export default PlaylistItem;
