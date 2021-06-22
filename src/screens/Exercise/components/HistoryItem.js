import React, { useState, useRef } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';

const {width, height} = Dimensions.get("window")

const HistoryItem = () => {
    return (
        <View style={styles.itemContainer}>

            {/* Statistics */}
            <View style={styles.infoContainer}>

                {/* Run Mode */}
                <View style={styles.modeContainer}>
                    <Text style={styles.modeText}>Calibration</Text>
                </View>

                {/* Distance */}
                <View style={styles.distanceContainer}>
                    <Text style={styles.distanceText}>9999999 km</Text>
                </View>

                <View style={styles.substatsContainer}>
                    {/* Duration */}
                    <View style={styles.subsubstatsContainer}>
                        <Text style={styles.substatsText}>23:59:59</Text>
                    </View>

                    {/* Average time /km */}
                    <View style={styles.subsubstatsContainer}>
                        <Text style={styles.substatsText}>1000 /km</Text>
                    </View>
                </View>
            </View>

            {/* Date */}
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>29/12/2999</Text>
            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer:{
       width: width * 0.95,
       height: height * 0.13,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
    //    backgroundColor: 'red',
    },  
    modeContainer:{
        width: width * 0.2,
        height: height * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: width * 0.05,
        backgroundColor: '#7289DA',
    },
    modeText:{
        fontWeight: 'bold',
        fontSize: 12,
        color: '#BABBBF',
    },
    infoContainer:{
        width: width * 0.7,
        height: height * 0.1,
        // backgroundColor: 'yellow',
    },
    distanceContainer:{
        width: width * 0.7,
        height: height * 0.04,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'purple',
    },
    distanceText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
    },
    substatsContainer:{
        width: width * 0.7,
        height: height * 0.03,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    subsubstatsContainer:{
        width: width * 0.35,
        height: height * 0.03,
        paddingHorizontal: width * 0.05,
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    substatsText:{
        fontSize: 14,
        color: '#BABBBF',
    },
    dateContainer:{
        // backgroundColor:'grey',
    },
    dateText:{
        fontSize: 14,
        color: '#BABBBF',
    },
})

export default HistoryItem;