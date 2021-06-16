import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, Animated, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import * as Firestore from '../../../api/firestore';

import color from '../../../constants/color';
import textStyle from '../../../constants/textStyle';

import Joinform from './JoinForm';

const {width, height} = Dimensions.get("window")

const Event = (props) => {
    const navigation = useNavigation();

    const title = props.title                   //Event title
    const description = props.description       //Short description
    const completed = props.completed;          //current progress value
    const target = props.target;                //targeted value
    const url = props.url;                      //Event url for info
    const id = props.id;                        //event id
    const participants = props.participants     //event participant count

    const [join, setJoin] = useState();
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

    useEffect(() => {
        Firestore.db_userEventStatus(
            (eventList) => {
                (eventList.includes(id) ? setJoin(true) : setJoin(false))
            },
            (error) => {console.log(error)},
        )
    },[])

    return(
        <View style={{paddingBottom: 15,}}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("EventInfo", {url: url})}>
                {/* Event Container */}
                <View style={{
                    backgroundColor: 'pink',
                    borderRadius: 15,
                    width: width - 40,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: 15,
                    paddingTop: 15,
                    elevation: 10,
                }}> 
                    {/* Details Segment  */}
                    <View style={{alignContent: 'flex-start', width: width - 40, paddingHorizontal: 15,}}> 

                        {/* Title & Button */}
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            paddingBottom: 5,
                            width: width - 70
                        }}>

                            {/* Title */}
                            <View style={{width: 0.5 * width}}>
                                <Text style={textStyle.title}
                                    numberOfLines={1}    
                                >
                                    {title}
                                </Text>
                            </View>
                            

                            {/* Join Button */}
                            <TouchableOpacity 
                                style={{
                                    backgroundColor: (join) ? color.secondary : color.primary,
                                    padding: 10,
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
                                            { text:"Confirm", onPress: () => {
                                                Firestore.db_leaveEvent(id);
                                                setJoin(false)
                                            }} ]
                                        )
                                    } else {
                                        setPopToggle(true)
                                    }
                                }}
                            > 
                                {(join) 
                                ? <Text style={{...textStyle.subHeader, fontWeight: 'bold',}}>Joined</Text> 
                                : <Text style={{...textStyle.subHeader, fontWeight: 'bold',}}>Join Now</Text>
                                }
                            </TouchableOpacity>
                        </View>
                        

                        {/* Description */}
                        <View style={{paddingRight: 5,}}>
                            <Text 
                                numberOfLines={2}
                                style={textStyle.subtitle}
                            >
                                {description}
                            </Text>                         
                        </View>
                        
                    </View>
                    
                    {/* Progress Segment */}
                    <View style={{position:'absolute', bottom: 15,}}>

                        {/* Numerical Progress */}
                        <View style={{flexDirection: 'row', width: width - 70, justifyContent: 'space-between'}}>
                            <Text style={{...textStyle.subtitle, fontWeight:'bold'}}>
                                Progress: {(completed/1000).toFixed(2)}/{(target/1000).toFixed(2)} km
                            </Text>
                            <Text style={{...textStyle.subtitle, fontWeight:'bold'}}>
                                {participants} Joined
                            </Text>
                        </View>

                        {/* Progress Bar */}
                        <View 
                            onLayout={e => {
                                const newWidth = e.nativeEvent.layout.width;
                                setProgressWidth(newWidth);
                            }}
                            style={{
                                height: 12,
                                borderRadius:height,
                                width: width - 70,
                                backgroundColor: '#DDDDDD',
                                overflow: 'hidden',
                        }}>
                            <Animated.View style={{
                                height: 12,
                                borderRadius:height,
                                width: width - 70,
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
                id={id}
            />
        </View>
    );
};

export default Event;