import React, { useState, useEffect } from 'react';
import {  Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from "react-native-paper";
import moment from 'moment';

import color from '../../../constants/color';


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
                backgroundColor: '#FFFFFF',
                width: 0.88 * width,
                height: 0.12 * height,
                borderRadius: 15,
                paddingVertical: 0.01 * height,
                paddingHorizontal: 0.02 * height,
                justifyContent: 'center',
                alignItems:'center',
                elevation: 5,
            }}>
                
                
                <View style={{
                    // backgroundColor: 'grey',
                    width: 0.8 * width,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                }}>
                    <View>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Icon name="running" color= {color.primary} size={0.04 * height}/>
                            <Text style={{fontSize: 0.04 * height, fontWeight: 'bold', paddingHorizontal: 0.01 * height,}}>{distance} km</Text>
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
                                    paddingHorizontal: 0.02 * height,
                                }}>
                                    <Icon name="stopwatch" color= {color.primary} size={0.03 * height}/>
                                    <Text style={{fontSize: 0.02 * height, paddingLeft: 0.005 * height,}}>{runTime.hours()}:{runTime.minutes()}:{runTime.seconds()}</Text>
                                </View>
                                
                                <View style={{
                                    flexDirection: 'row', 
                                    alignItems:'center',
                                    paddingHorizontal: 0.02 * height,
                                    }}>
                                    <Icon name="paw" color= {color.primary} size={0.03 * height}/>
                                    <Text style={{fontSize: 0.02 * height, paddingLeft: 0.005 * height,}}>{steps}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{fontSize: 0.025 * height, fontWeight: 'bold', color: color.secondary}}>{date}</Text>
                        <Text style={{fontSize: 0.015 * height, color: color.secondary}}>{day}</Text>
                        <Text style={{fontSize: 0.015 * height, color: color.secondary}}>{time}</Text>
                    </View>
                </View>

                


                
                

            
                
            </View>
        </View>
    );
};

export default RunHistoryEntry;