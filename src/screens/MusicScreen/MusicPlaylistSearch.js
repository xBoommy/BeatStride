import React, { useState, useRef, useEffect } from 'react';
import {  Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Button, Modal, TouchableOpacity } from 'react-native';

//Search page
import SearchPage from './components/SearchPage';


//Throw bottom sheet content here
const MusicPlaylistSearch = (props) => {
    const popToggle = props.popToggle;
    const setPopToggle = props.setPopToggle;

    return (
        <Modal
            transparent={true}
            visible={popToggle}
        >
            <View style={styles.popUpBackground}>

                <KeyboardAvoidingView style={styles.popUp}>
                    
                        <SearchPage />

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setPopToggle(false)}
                        >
                            {/* X Image */}
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
        width: Dimensions.get('window').width - 20,
        height: 0.9 * Dimensions.get('window').height,
        borderRadius: 15,
        elevation: 10,
    },
    closeButton:{
        position: 'absolute',
        width: 0.05 * Dimensions.get('window').height,
        height: 0.05 * Dimensions.get('window').height,
        borderRadius: 0.05 * Dimensions.get('window').height / 2,
        backgroundColor: 'black',
        top: 0.01 * Dimensions.get('window').height,
        left: 0.01 * Dimensions.get('window').height,
    },
});

export default MusicPlaylistSearch;