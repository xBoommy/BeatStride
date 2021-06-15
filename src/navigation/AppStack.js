import 'react-native-gesture-handler';
import React, { } from 'react';
import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from './AppTab';
import MusicPlaylistSongs from '../screens/MusicScreen/MusicPlaylistSongs';
import EventInfo from '../screens/SocialScreen/Events/EventInfo';

//Test
import LoginScreen from '../screens/LoginScreen';
import RegisterOne from '../screens/RegisterOne';
import RegisterTwo from '../screens/RegisterTwo';
import Guide from '../screens/OnBoardingScreen/GuideScreen/Guide';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator
            initialRouteName="Guide"
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
            <Stack.Screen
                key="LoginScreen"
                name="LoginScreen"
                component={LoginScreen}
                options={{title: "Login"}}

            />
            <Stack.Screen
                key="RegisterOne"
                name="RegisterOne"
                component={RegisterOne}
                options={{title: "Registering"}}

            />
            <Stack.Screen
                key="RegisterTwo"
                name="RegisterTwo"
                component={RegisterTwo}
                options={{title: "Registering"}}

            />
            <Stack.Screen
                key="Guide"
                name="Guide"
                component={Guide}
                options={{headerShown: false}}

            />
        </Stack.Navigator>
    )
}
export default AppStack