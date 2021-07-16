import 'react-native-gesture-handler';
import React, {} from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from './AppTab';
import LoadingScreen from '../screens/Onboarding/LoadingScreen';
import LoginScreen from '../screens/Onboarding/LoginScreen';
import RegisterScreen from '../screens/Onboarding/RegisterScreen';
import GuideScreen from '../screens/Onboarding/GuideScreen';
import SongScreen from '../screens/Music/SongsScreen';
import RunningScreen from '../screens/Running/RunningScreen';
import EndScreen from '../screens/RunEnd/EndScreen';
import HistoryView from '../screens/Exercise/components/HistoryView';
import RequestScreen from '../screens/Social/RequestScreen';
import SearchScreen from '../screens/Social/SearchScreen';

const {width, height} = Dimensions.get("window")

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
                        height: height * 0.08
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
            <Stack.Screen
                key="HistoryView"
                name="HistoryView"
                component={HistoryView}
                options={{headerShown: false}}
            />
            <Stack.Screen
                key="RequestScreen"
                name="RequestScreen"
                component={RequestScreen}
                options={{
                    title: "Friend Requests",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                key="SearchScreen"
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    title: "Search Users ",
                    headerStyle: {
                        backgroundColor: '#1E2124',
                        height: height * 0.1,
                    },
                    headerTintColor: '#BABBBF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            
        </Stack.Navigator>
    );
};

export default AppStack;