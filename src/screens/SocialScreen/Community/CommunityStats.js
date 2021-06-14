import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, Text } from 'react-native';

const {width, height} = Dimensions.get("window")

const CommunityStats = (props) => {
    const regionDistance = props.regionDistance;
    const user_region = props.user_region;
    const user_distance = props.user_distance;

    return(
        <View style={{
            width: 0.9 *  width,
            height: 0.2 * height,
            paddingHorizontal: 0.02 * height, 
            justifyContent: 'space-around', 
            alignItems: 'flex-start',
            // backgroundColor: 'blue'
        }}>
            <View style={{}}>
                <Text style={{
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: 0.1 * height,
                    includeFontPadding: false
                }}>
                    {user_region}
                </Text>
            </View>
            
            <View>
                <Text style={{
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        fontSize: 0.02 * height,
                        includeFontPadding: false
                }}>
                    Total Distance: {regionDistance} km
                </Text>
                <Text style={{
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        fontSize: 0.015 * height,
                        includeFontPadding: false
                }}>
                    Your Contribution: {user_distance} km
                </Text>
            </View>
            

        </View>
    );
};

export default CommunityStats