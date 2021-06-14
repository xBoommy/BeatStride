import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import Screen from '../../constants/screen';
import textStyle from '../../constants/textStyle';
import color from '../../constants/color';

import Individual from './Individual/IndividualComponent';
import Community from './Community/CommunityComponent';
import Events from './Events/EventsComponent';

const {width, height} = Dimensions.get("window")

const SocialMain = ({navigation}) => {
    const [component, setComponent] = useState("Individual")

    return(
        <Screen>
            {/* Header */}
            <Text style={textStyle.header}>Social</Text>

            {/* Content */}
            <View style={{
                alignItems:'center', 
                // backgroundColor:'blue'
            }}>

                {/* Component Navigation */}
                <View style={{
                    flexDirection: 'row', 
                    // backgroundColor:'pink', 
                    justifyContent:'space-around',
                    width: 0.7 * width,
                    paddingTop: 0.01 * height,
                }}
                >
                    <TouchableOpacity onPress={() => setComponent("Individual")}>
                        <Text style={textStyle.subHeader}>Individual</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setComponent("Community")}>
                        <Text style={textStyle.subHeader}>Community</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setComponent("Events")}>
                        <Text style={textStyle.subHeader}>Events</Text>
                    </TouchableOpacity>
                </View>
                {/* Navigation Indicator */}
                <View style={{
                    flexDirection: 'row', 
                    // backgroundColor:'pink', 
                    justifyContent:'space-around',
                    width: 0.7 * width,
                    paddingBottom: 0.01 * height,
                }}
                >
                    <View style={{
                        width: 0.185 * width,
                        height:0.005 * height,
                        backgroundColor: (component == "Individual") ? color.primary : 'transparent',
                        borderRadius: 0.005 * height,
                    }}/>

                    <View style={{
                        width: 0.22 * width,
                        height:0.005 * height,
                        backgroundColor: (component == "Community") ? color.primary : 'transparent',
                        borderRadius: 0.005 * height,
                    }}/>

                    <View style={{
                        width: 0.12 * width,
                        height:0.005 * height,
                        backgroundColor: (component == "Events") ? color.primary : 'transparent',
                        borderRadius: 0.005 * height,
                    }}/>
                    
                </View>

                {/* Component */}
                <View style={{
                    backgroundColor: '#FFFFFF',
                    width: 0.95 *  width,
                    height: 0.72 * height,
                    borderRadius: 15,
                    elevation: 5,
                }}>
                    {(component == "Individual") ? <Individual/> : ((component == "Community") ? <Community/> : ((component == "Events") ? <Events/> : <></>) )}
                </View>
            </View>
        
        </Screen>
    );
};

export default SocialMain;