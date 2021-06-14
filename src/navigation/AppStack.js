import 'react-native-gesture-handler';
import React, { } from 'react';
import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from './AppTab';
import MusicPlaylistSongs from '../screens/MusicScreen/MusicPlaylistSongs'
// MusicPlaylistSongs


const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator
            initialRouteName="AppTab"
            headerMode="none"
        >
            <Stack.Screen
                key="AppTab"
                name="AppTab"
                component={AppTab}
            />
            <Stack.Screen
                key="MusicPlaylistSongs"
                name="MusicPlaylistSongs"
                component={MusicPlaylistSongs}
            />
        </Stack.Navigator>
    )
}
export default AppStack