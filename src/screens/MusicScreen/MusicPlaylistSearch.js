import React, { useState, useRef, useEffect } from 'react';
import {  Dimensions, KeyboardAvoidingView, StyleSheet, View, Modal, Image, TouchableOpacity } from 'react-native';

import color from '../../constants/color';
import SearchPage from './components/SearchPage';

const {height, width} = Dimensions.get('window');

const MusicPlaylistSearch = (props) => {
    const popToggle = props.popToggle;
    const setPopToggle = props.setPopToggle;

    return (
      <Modal transparent={true} visible={popToggle}>
        <View style={styles.popUpBackground}>
          <KeyboardAvoidingView style={styles.popUp}>
            <SearchPage />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPopToggle(false)}>
              <Image
                source={require('../../assets/icons/close.png')}
                style={{
                  height: 0.04 * height,
                  width: 0.04 * height,
                  tintColor: color.primary,
                }}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    popUpBackground:{
        backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popUp:{
        backgroundColor: '#FFFFFF',
        width: width - 20,
        height: 0.9 * height,
        borderRadius: 15,
        elevation: 10,
    },
    closeButton:{
        position: 'absolute',
        width: 0.07 * height,
        height: 0.07 * height,
        borderRadius: height / 2,
        backgroundColor: '#fdfdfd',
        top: 0.03 * height,
        left: 0.01 * height,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MusicPlaylistSearch;
