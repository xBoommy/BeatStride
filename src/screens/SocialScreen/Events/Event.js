import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, Animated, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import color from '../../../constants/color';

import Joinform from './JoinForm';

const {width, height} = Dimensions.get("window")

const Event = (props) => {
    const navigation = useNavigation();

    const title = props.title                   //Event title
    const description = props.description       //Short description
    const completed = props.completed;          //current progress value
    const target = props.target;                //targeted value
    const url = props.url;                      //Event url for info

    const [join, setJoin] = useState(false);
    const [popToggle, setPopToggle] = useState(false);

    const [progressWidth, setProgressWidth] = useState(0);
    const animatedValue = useRef(new Animated.Value(-1000)).current;
    const reactive = useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [])

    useEffect(() => {
        reactive.setValue(- progressWidth + (progressWidth * completed) / target);
    },[completed, progressWidth])

    return(
        <View style={{paddingBottom: 0.02 * height}}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("EventInfo", {url: url})}>
                {/* Event Container */}
                <View style={{
                    backgroundColor: 'pink',
                    borderRadius: 15,
                    width: 0.9 *  width,
                    height: 0.2 * height,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 0.02 * width,
                    paddingTop: 0.02 * height,
                    elevation: 10,
                }}> 
                    {/* Details Segment  */}
                    <View style={{alignContent: 'flex-start', width: 0.9 *  width, paddingHorizontal: 0.04 * width,}}> 

                        {/* Title & Button */}
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            paddingBottom: 0.005 * height,
                        }}>

                            {/* Title */}
                            <Text style={{
                                fontSize: 0.03 * height,
                                fontWeight: 'bold',
                            }}>
                                {title}
                            </Text>

                            {/* Join Button */}
                            <TouchableOpacity 
                                style={{
                                    backgroundColor: (join) ? color.secondary : color.primary,
                                    padding: 0.01 * height,
                                    borderRadius: height,
                                    width: 0.25 * width,
                                    justifyContent:'center',
                                    alignItems: 'center',
                                    elevation: 5,
                                }}
                                onPress={() => {
                                    if (join) {
                                        Alert.alert(
                                            "Quit Event",
                                            "Are you sure you want to leave the event?",
                                            [ { text:"Cancel", onPress: () => {}}, 
                                            { text:"Confirm", onPress: () => {setJoin(false)}} ]
                                        )
                                    } else {
                                        setPopToggle(true)
                                    }
                                }}
                            > 
                                {(join) 
                                ? <Text style={{fontSize: 0.018 * height, fontWeight: 'bold',}}>Joined</Text> 
                                : <Text style={{fontSize: 0.018 * height, fontWeight: 'bold',}}>Join Now</Text>
                                }
                            </TouchableOpacity>
                        </View>
                        

                        {/* Description */}
                        <View style={{paddingRight: 0.05 * width,}}>
                            <Text 
                                numberOfLines={2}
                                style={{fontSize: 0.018 * height,}}
                            >
                                {description}
                            </Text>                         
                        </View>
                        
                    </View>
                    
                    {/* Progress Segment */}
                    <View style={{position:'absolute', bottom: 0.02 * height,}}>

                        {/* Numerical Progress */}
                        <Text style={{fontWeight: 'bold', fontSize: 0.015 * height,}}>Progress: {completed}/{target} km</Text>

                        {/* Progress Bar */}
                        <View 
                            onLayout={e => {
                                const newWidth = e.nativeEvent.layout.width;
                                setProgressWidth(newWidth);
                            }}
                            style={{
                                height: 0.02 * height,
                                borderRadius:height,
                                width: 0.8 *  width,
                                backgroundColor: '#DDDDDD',
                                overflow: 'hidden',
                        }}>
                            <Animated.View style={{
                                height: 0.02 * height,
                                borderRadius:height,
                                width: 0.8 *  width,
                                backgroundColor: color.primary,
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                transform: (completed > target) ? [{translateX: 0}] : [{translateX: animatedValue,}],
                            }}/>
                        </View>
                    </View>

                </View>
            </TouchableWithoutFeedback>
            
            {/* Pop up Form when joining */}
            <Joinform 
                popToggle={popToggle}
                setPopToggle={setPopToggle}
                setJoin={setJoin}
            />
        </View>
    );
};

export default Event;