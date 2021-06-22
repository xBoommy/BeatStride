import React, { useState, useRef } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';

import PlaylistSelectionBasic from '../PlaylistSelectionBasic';

const {width, height} = Dimensions.get("window")

const BasicRun = () => {
    const [selectToggle, setSelectToggle] = useState(false)

    return (
        <View style={styles.componentContainer}>

            {/* Text */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Basic Run</Text>
                
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>Go for a Run & Choose your own music.</Text>
            </View>

            {/* Start Button */}
            <TouchableOpacity style={styles.startButton} onPress={() => {setSelectToggle(true)}}>
                <View>
                    {/* resizeMode={"contain"} */}
                    {/* style={styles.startIcon} */}
                </View>
            </TouchableOpacity>

            {/* Playlist Selection Popup */}
            <PlaylistSelectionBasic
                selectToggle={selectToggle}
                setSelectToggle={setSelectToggle}
            />            

        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        width: width * 0.95,
        height: height * 0.2,
        alignSelf: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#4F535C',
    },  
    titleContainer:{
        width: width * 0.65,
        height: height * 0.08,
        justifyContent:'center',
        paddingLeft: width * 0.7 * 0.1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#BABBBF',
    },
    titleText:{
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    descriptionContainer:{
        width: width * 0.63,
        height: height * 0.08,
        paddingLeft: width * 0.7 * 0.05,
        paddingTop: height * 0.08 * 0.1,
        // backgroundColor: 'purple',
    },
    descriptionText:{
        fontSize: 12,
        color: '#BABBBF',
    },
    startButton:{
        height: height * 0.1,
        aspectRatio: 1,
        borderRadius: height,
        position: 'absolute',
        right: ((width * 0.95) - (width * 0.65) - (height * 0.1)) * 0.5,
        backgroundColor: '#BABBBF',
    },
    startIcon:{
        tintColor: '#4F535C'
    },
})

export default BasicRun;