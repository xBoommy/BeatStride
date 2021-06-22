import React, { useState, useEffect } from 'react';
import { StyleSheet,  Text,  View, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment';

const {width, height} = Dimensions.get("window")

const HistoryItem = (props) => {
    const navigation = useNavigation();

    const day = props.day;
    const date = props.date;
    const time = props.time;
    const distance = props.distance;
    const duration = props.duration;
    const steps = props.steps;
    const positions = props.positions;
    const mode = props.mode;

    const displayTime = moment.duration(duration)
    const avgPace = duration / (distance/1000)
    const displayPace = moment.duration(avgPace)

    return (
        <View style={styles.itemContainer}>

            {/* Statistics */}
            <View style={styles.infoContainer}>

                {/* Run Mode */}
                <View style={styles.modeContainer}>
                    <Text style={styles.modeText}>{mode}</Text>
                </View>

                {/* Distance */}
                <View style={styles.distanceContainer}>
                    <Text style={styles.distanceText}>{(distance / 1000).toFixed(2)} km</Text>
                </View>

                <View style={styles.substatsContainer}>
                    {/* Duration */}
                    <View style={styles.subsubstatsContainer}>
                        <Text style={styles.substatsText}>{displayTime.hours()}:{displayTime.minutes()}:{displayTime.seconds()}</Text>
                    </View>

                    {/* Average time /km */}
                    <View style={styles.subsubstatsContainer}>
                        <Text style={styles.substatsText}>{displayTime.minutes()}'{displayTime.seconds()}" /km</Text>
                    </View>
                </View>
            </View>

            {/* Date */}
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{date}</Text>
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