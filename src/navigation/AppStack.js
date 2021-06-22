import 'react-native-gesture-handler';
import React, { } from 'react';
import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from './AppTab';
import LoadingScreen from '../screens/Onboarding/LoadingScreen';
import LoginScreen from '../screens/Onboarding/LoginScreen';
import RegisterScreen from '../screens/Onboarding/RegisterScreen';
import GuideScreen from '../screens/Onboarding/GuideScreen';
import SongScreen from '../screens/Music/SongsScreen';
import RunningScreen from '../screens/Running/RunningScreen';
import EndScreen from '../screens/RunEnd/EndScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator
            initialRouteName="LoadingScreen"
        >
            <Stack.Screen
                key="LoadingScreen"
                name="LoadingScreen"
                component={LoadingScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="LoginScreen"
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="RegisterScreen"
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="GuideScreen"
                name="GuideScreen"
                component={GuideScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="AppTab"
                name="AppTab"
                component={AppTab}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="SongScreen"
                name="SongScreen"
                component={SongScreen}
                options={{
                    title: "Playlist Song",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                key="RunningScreen"
                name="RunningScreen"
                component={RunningScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="EndScreen"
                name="EndScreen"
                component={EndScreen}
                options={{headerShown: false}}
            />
            
        </Stack.Navigator>
    );
};

export default AppStack;