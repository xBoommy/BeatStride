import 'react-native-gesture-handler';
import React, { } from 'react';
import {  StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import color from '../constants/color';

import ExerciseMain from '../screens/ExerciseScreen/ExerciseMain'
import MusicMain from '../screens/MusicScreen/MusicMain'
import SocialMain from '../screens/SocialScreen/SocialMain'
import ProfileMain from '../screens/ProfileScreen/ProfileMain'

const {width, height} = Dimensions.get("window")

const Tab = createBottomTabNavigator();

const AppTab = () => {
    return (
        <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {...styles.tabNavigationContainer}
                }}
                initialRouteName="Exercise"
        >
            <Tab.Screen 
                name="ExerciseMain" 
                component={ExerciseMain}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabIconContainer}>
                            <Image 
                                source={require('../assets/icons/TabExercise.png')}
                                resizeMode= 'contain'
                                style={{
                                    ...styles.tabIconImage,
                                    tintColor: focused ? color.primary : color.secondary,
                                }}/>
                            <Text 
                                style = {{
                                    ...styles.tabIconText,
                                    color:focused ? color.primary : color.secondary,
                                }}>EXERCISE</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen 
                name="MusicMain" 
                component={MusicMain}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabIconContainer}>
                            <Image 
                                source={require('../assets/icons/TabMusic.png')}
                                resizeMode= 'contain'
                                style={{
                                    ...styles.tabIconImage,
                                    tintColor: focused ? color.primary : color.secondary,
                                }}/>
                            <Text 
                                style = {{
                                    ...styles.tabIconText,
                                    color:focused ? color.primary : color.secondary,
                                }}>MUSIC</Text>
                        </View>
                    )
                }}
            />
            
            <Tab.Screen 
                name="SocialMain" 
                component={SocialMain}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabIconContainer}>
                            <Image 
                                source={require('../assets/icons/TabSocial.png')}
                                resizeMode= 'contain'
                                style={{
                                    ...styles.tabIconImage,
                                    tintColor: focused ? color.primary : color.secondary,
                                }}/>
                            <Text 
                                style = {{
                                    ...styles.tabIconText,
                                    color:focused ? color.primary : color.secondary,
                                }}>SOCIAL</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen 
                name="ProfileMain" 
                component={ProfileMain}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabIconContainer}>
                            <Image 
                                source={require('../assets/icons/TabProfile.png')}
                                resizeMode= 'contain'
                                style={{
                                    ...styles.tabIconImage,
                                    tintColor: focused ? color.primary : color.secondary,
                                }}/>
                            <Text 
                                style = {{
                                    ...styles.tabIconText,
                                    color:focused ? color.primary : color.secondary,
                                }}>PROFILE</Text>
                        </View>
                    )
                }}
            />
            
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabNavigationContainer:{
        // Container
        position: 'absolute',
        bottom: 0.03 * height,
        left: 0.05 * width,
        right: 0.05 * width,
        elevation: 0,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        height: 0.12 * height,
        // Shadow
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    tabIconContainer:{
        alignItems: 'center', 
        justifyContent:'center', 
        top: 5,
    },
    tabIconImage:{
        width: 25,
        height: 25,
    },
    tabIconText:{
        fontSize: 12,
        padding: 5,
    },
})
export default AppTab