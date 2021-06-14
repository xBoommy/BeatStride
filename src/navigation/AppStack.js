import 'react-native-gesture-handler';
import React, { } from 'react';
import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from './AppTab';
import MusicPlaylistSongs from '../screens/MusicScreen/MusicPlaylistSongs';
import EventInfo from '../screens/SocialScreen/Events/EventInfo';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator
            initialRouteName="AppTab"
        >
            <Stack.Screen
                key="AppTab"
                name="AppTab"
                component={AppTab}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="MusicPlaylistSongs"
                name="MusicPlaylistSongs"
                component={MusicPlaylistSongs}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="EventInfo"
                name="EventInfo"
                component={EventInfo}
                options={{title: "Event Info"}}

            />
        </Stack.Navigator>
    )
}
export default AppStack