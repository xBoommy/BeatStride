import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import * as Firestore from '../../../api/firestore';

import Screen from '../../../constants/screen';

import Event from './Event'

const {width, height} = Dimensions.get("window")

const EventsComponent = ({navigation}) => {
    const [eventList, setEventList] = useState([]);

    useEffect(()=>{
        Firestore.db_events(
            (events) => {setEventList(events)},
            (error) => {console.log("Events list error")}
        )
    },[])
    
    return(
        <Screen>
            <View style={{
                alignItems: 'center',
            }}>
                <FlatList
                    data={eventList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <Event 
                            title={item.title}
                            description={item.description}
                            completed={item.progress} 
                            target={item.target}
                            url={item.uri}
                            id={item.id}
                            participants={item.participants}
                        />}
                    style={{width:0.9 *  width}}
                />
            </View>
        </Screen>
    );
};

export default EventsComponent;