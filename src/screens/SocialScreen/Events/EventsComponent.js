import React, { } from 'react';
import { View, FlatList, Dimensions } from 'react-native';

import Screen from '../../../constants/screen';

import Event from './Event'

const {width, height} = Dimensions.get("window")

//EXAMPLE DATA
const events = [
    {
        id: 1,
        title: "Charity Run 2021",
        description: "Run for the year 2021. Run for your life",
        completed: 10,
        target: 50,
        url:"https://www.facebook.com"
    },
    {
        id: 2,
        title: "Charity Run 2020",
        description: "Going through a hard time? Run away from life with use today",
        completed: 45,
        target: 100,
        url:"https://www.youtube.com"
    },
    {
        id: 3,
        title: "Charity Run 2019",
        description: "what is this event even? I heard you can get 50 days off your school term just by participating in this event. Join me today",
        completed: 45,
        target: 50,
        url:"https://www.google.com"
    },
    {
        id: 4,
        title: "Charity Run 2018",
        description: "Code_Exp hackaton event",
        completed: 5,
        target: 50,
        url:"https://www.yahoo.com"
    },
]

const EventsComponent = ({navigation}) => {
    return(
        <Screen>
            <View style={{alignItems: 'center',}}>
                <FlatList
                    data={events}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <Event 
                            title={item.title}
                            description={item.description}
                            completed={item.completed} 
                            target={item.target}
                            url={item.url}
                        />}
                    style={{width:0.9 *  width}}
                />
            </View>
        </Screen>
    );
};

export default EventsComponent;