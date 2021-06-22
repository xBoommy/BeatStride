import React from 'react';
import {  SafeAreaView,  StyleSheet,  Text,  View, Dimensions, FlatList, Modal, TouchableOpacity } from 'react-native';

import PlaylistSelectionItem from './components/PlaylistSelectionItem';

const {width, height} = Dimensions.get("window")

// For Testing Purpose - Remove before use
const playlists = [
    {id: 1, name : 1},
    {id: 2, name : 2},
    {id: 3, name : 3},
    {id: 4, name : 4},
    {id: 5, name : 5},
    {id: 6, name : 6},
    {id: 7, name : 7},
]

const PlaylistSelectionBasic = (props) => {
    const settingToggle = props.settingToggle;
    const setSettingToggle = props.setSettingToggle;

    return (
        <Modal visible={settingToggle} transparent={true} animationType={'slide'}>
            <View style={styles.modal}>

                {/* PopUp Area */}
                <View style={styles.settingContainer}>

                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Edit Goal</Text>
                    </View>

                    {/* Button Container */}
                    <View style={styles.buttonContainer}>
                        {/* Cancel Button */}
                        <TouchableOpacity onPress={() => {setSettingToggle(false)}}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Confirm Button */}
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal:{
        width: width,
        height: height,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    settingContainer:{
        width: width * 0.95,
        height: height * 0.5,
        borderRadius: 5,
        backgroundColor: '#36393E',
    },
    headerContainer:{
        width: width * 0.95,
        height: height * 0.07,
        justifyContent:'center',
        paddingHorizontal: width * 0.1,
        // backgroundColor: 'yellow',
    },
    headerText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#BABBBF'
    },
    buttonContainer:{
        position: 'absolute',
        width: width * 0.7,
        bottom: height * 0.95 * 0.02 ,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
    },
    button:{
        width: width * 0.3,
        height: height * 0.13 * 0.4,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#72767D',
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})
export default PlaylistSelectionBasic