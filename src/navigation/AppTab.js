import 'react-native-gesture-handler';
import React, { } from 'react';
import {  StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import ExerciseMain from '../screens/ExerciseScreen/ExerciseMain'
import MusicMain from '../screens/MusicScreen/MusicMain'
import SocialMain from '../screens/SocialScreen/SocialMain'
import ProfileMain from '../screens/ProfileScreen/ProfileMain'

const AppTab = () => {
    return (
        <Tab.Navigator
                tabBarOptions={{
                    showLabel: true,
                    // style: {...styles.tabNavigationContainer}
                }}
                initialRouteName="Exercise"
        >
            {/* <Tab.Screen 
                name="ExerciseMain" 
                component={ExerciseMain}
                // options={{
                //     tabBarIcon: ({focused}) => (
                //         <View style={styles.tabIconContainer}>
                //             <Image 
                //                 source={require('../assets/icons/TabMusic.png')}
                //                 resizeMode= 'contain'
                //                 style={{
                //                     ...styles.tabIconImage,
                //                     tintColor: focused ? '#e32f45' : '#748c94',
                //                 }}/>
                //             <Text 
                //                 style = {{
                //                     ...styles.tabIconText,
                //                     color:focused ? '#e32f45' : '#748c94',
                //                 }}>MUSIC</Text>
                //         </View>
                //     )
                // }}
            /> */}
            <Tab.Screen
                name="ExerciseMain"
                component={ExerciseMain}
            />
            <Tab.Screen
                name="MusicMain"
                component={MusicMain}
            />
            <Tab.Screen
                name="SocialMain"
                component={SocialMain}
            />
            <Tab.Screen
                name="ProfileMain"
                component={ProfileMain}
            />
        </Tab.Navigator>
    )
}
export default AppTab