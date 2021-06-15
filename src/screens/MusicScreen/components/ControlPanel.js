import React from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet, Text, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

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
            <SafeAreaView style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: 50, height: 50, borderRadius: 5, marginHorizontal: 5}} source={{uri: currentlyPlaying.imageUri}} />
                <SafeAreaView style={{width: 0.5 * width}}>
                    <Text numberOfLines={1}>{currentlyPlaying.title}</Text>
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
        justifyContent: 'center',
        width: 0.65 * width,
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
