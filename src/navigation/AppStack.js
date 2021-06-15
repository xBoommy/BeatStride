import 'react-native-gesture-handler';
import React, { } from 'react';
import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from './AppTab';
import MusicPlaylistSongs from '../screens/MusicScreen/MusicPlaylistSongs';
import EventInfo from '../screens/SocialScreen/Events/EventInfo';

import Loading from '../screens/LoadingScreen';
import Login from '../screens/OnBoardingScreen/LoginScreen';
import Register1 from '../screens/OnBoardingScreen/Register/RegisterOne';
import Register2 from '../screens/OnBoardingScreen/Register/RegisterTwo';
import Guide from '../screens/OnBoardingScreen/GuideScreen/Guide';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator
            initialRouteName="Loading"
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
                key="Login"
                name="Login"
                component={Login}
                options={{headerShown: false}}

            />
            <Stack.Screen
                key="Register1"
                name="Register1"
                component={Register1}
                options={{headerShown: false}}

            />
            <Stack.Screen
                key="Register2"
                name="Register2"
                component={Register2}
                options={{headerShown: false}}

            />
            <Stack.Screen
                key="Guide"
                name="Guide"
                component={Guide}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="Loading"
                name="Loading"
                component={Loading}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
export default AppStack