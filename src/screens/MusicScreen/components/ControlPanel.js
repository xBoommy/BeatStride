import React from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet, Text, Image, Dimensions} from 'react-native';

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
            <SafeAreaView style={{flexDirection: 'row'}}>
                <Image style={{width: 50, height: 50}} source={{uri: currentlyPlaying.imageUri}} />
                <SafeAreaView>
                    <Text>{currentlyPlaying.title}</Text>
                    {currentlyPlaying.artist !== 'undefined' && <Text>{currentlyPlaying.artist}</Text>}
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
              <Image
                style={styles.controlButton}
                source={require('../../../assets/icons/pause.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={playHandler}>
              <Image
                style={styles.controlButton}
                source={require('../../../assets/icons/play.png')}
              />
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
        backgroundColor: '#ffffff',
        height: '100%',
        borderRadius: 15,
    },
    currentPlayingContainer: {
        //alignItems: 'center',
        justifyContent: 'center',
        width: '65%',
    },
    controlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '35%',
    },
    controlButton: {
        margin: 5,
        width: 25,
        height: 25,
    },
});

export default ControlPanel;
