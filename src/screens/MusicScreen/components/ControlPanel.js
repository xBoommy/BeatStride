import React from 'react';
import {SafeAreaView, View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';

import color from '../../../constants/color';
import textStyle from '../../../constants/textStyle';

const ControlPanel = props => {

    //Constant props
    const isPlaying = props.isPlaying;
    const currentlyPlaying = props.currentlyPlaying;
    //Method props
    const playHandler = props.play;
    const pauseHandler = props.pause;
    const nextHandler = props.next;
    const previousHandler = props.previous;

    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.currentPlayingContainer}>
          {currentlyPlaying && (
            <SafeAreaView style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{width: 50, height: 50, borderRadius: 5, marginHorizontal: 5}} source={{uri: currentlyPlaying.imageUri}} />
                <SafeAreaView style={{width: '60%'}}>
                    <Text numberOfLines={1}>{currentlyPlaying.title}</Text>
                    {currentlyPlaying.artist !== 'undefined' && <Text style={{...textStyle.subtitle, color: color.secondary }}>{currentlyPlaying.artist}</Text>}
                </SafeAreaView>
            </SafeAreaView>
          )}
        </SafeAreaView>
        <SafeAreaView style={styles.controlContainer}>
          <TouchableOpacity
            onPress={previousHandler}>
            <Image
              style={styles.controlButton}
              source={require('../../../assets/icons/previous.png')}
            />
          </TouchableOpacity>
          {isPlaying ? (
            <TouchableOpacity
              onPress={pauseHandler}>
                <View style={styles.pausePlayContainer}>
              <Image
                style={styles.pausePlayButton}
                source={require('../../../assets/icons/pause.png')}
              />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={playHandler}>
                <View style={styles.pausePlayContainer}>
              <Image
                style={{...styles.pausePlayButton, transform: [{translateX: 3}]}}
                source={require('../../../assets/icons/play.png')}
              />
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={nextHandler}>
            <Image
              style={styles.controlButton}
              source={require('../../../assets/icons/next.png')}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor: '#ffffff',
        height: '100%',
        borderRadius: 15,
    },
    currentPlayingContainer: {
        justifyContent: 'center',
        width: '60%',
    },
    controlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    controlButton: {
        margin: 5,
        width: 25,
        height: 25,
        tintColor: color.primary,
    },
    pausePlayButton: {
      width: 25,
      height: 25,
      tintColor: '#FFFFFF'
    },
    pausePlayContainer: {
      backgroundColor: color.primary,
      width: 55,
      height: 55,
      borderRadius: 27.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default ControlPanel;
