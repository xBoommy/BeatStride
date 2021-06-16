import React, { useState, useEffect } from 'react';
import {  Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from "react-native-paper";
import moment from 'moment';

import color from '../../../constants/color';
import textStyle from '../../../constants/textStyle';


const {width, height} = Dimensions.get("window")

const RunHistoryEntry = (props) => {
    const navigation = useNavigation();

    const day = props.day;
    const date = props.date;
    const time = props.time;
    const distance = props.distance;
    const duration = props.duration;
    const steps = props.steps;
    const positions = props.positions;

    const runTime = moment.duration(duration)

    return(
        <View style={{paddingVertical: 0.01 * height, alignItems:'center'}}>
            <View style={{
                backgroundColor: 'pink',
                width: width - 30,
                height: 0.12 * height,
                borderRadius: 15,
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: 'center',
                alignItems:'center',
                elevation: 5,
            }}>
                
                
                <View style={{
                    // backgroundColor: 'grey',
                    width: width-60,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                }}>
                    <View>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Icon name="running" color= {color.primary} size={30}/>
                            <Text style={{...textStyle.title, paddingHorizontal: 10,}}>
                                {(distance > 1000) ? (distance/1000).toFixed(2) +" km" : distance.toFixed(2) + " m"}
                                </Text>
                        </View>
                        <View style={{
                            // backgroundColor: 'pink'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                // backgroundColor: 'pink',
                            }}>
                                <View style={{flexDirection: 'row', 
                                    alignItems:'center', 
                                    paddingHorizontal: 20,
                                }}>
                                    <Icon name="stopwatch" color= {color.primary} size={20}/>
                                    <Text style={{...textStyle.title2, paddingLeft: 10,}}>{runTime.hours()}:{runTime.minutes()}:{runTime.seconds()}</Text>
                                </View>
                                
                                <View style={{
                                    flexDirection: 'row', 
                                    alignItems:'center',
                                    paddingHorizontal: 10,
                                    }}>
                                    <Icon name="paw" color= {color.primary} size={20}/>
                                    <Text style={{...textStyle.title2, paddingLeft: 10,}}>{steps}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{...textStyle.title2, fontWeight: 'bold', color: color.secondary}}>{date}</Text>
                        <Text style={{...textStyle.subtitle, color: color.secondary}}>{day}</Text>
                        <Text style={{...textStyle.subtitle, color: color.secondary}}>{time}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RunHistoryEntry;