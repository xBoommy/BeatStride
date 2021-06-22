import 'react-native-gesture-handler';
import React, { } from 'react';
import {  StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExerciseScreen from '../screens/Exercise/ExerciseScreen';
import MusicScreen from '../screens/Music/MusicScreen';


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
                name="ExerciseScreen" 
                component={ExerciseScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabIconContainer}>
                            <Image 
                                source={require('../assets/icons/TabExercise.png')}
                                resizeMode= 'contain'
                                style={{
                                    ...styles.tabIconImage,
                                    tintColor: focused ? '#7289DA' : '#BABBBF',
                                }}/>
                            <Text 
                                style = {{
                                    ...styles.tabIconText,
                                    color: focused ? '#7289DA' : '#BABBBF',
                                }}>EXERCISE</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen 
                name="MusicScreen" 
                component={MusicScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabIconContainer}>
                            <Image 
                                source={require('../assets/icons/TabMusic.png')}
                                resizeMode= 'contain'
                                style={{
                                    ...styles.tabIconImage,
                                    tintColor: focused ? '#7289DA' : '#BABBBF',
                                }}/>
                            <Text 
                                style = {{
                                    ...styles.tabIconText,
                                    color: focused ? '#7289DA' : '#BABBBF',
                                }}>MUSIC</Text>
                        </View>
                    )
                }}
            />

            {/* <Tab.Screen 
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
                                    tintColor: focused ? '#7289DA' : '#BABBBF',
                                }}/>
                            <Text 
                                style = {{
                                    ...styles.tabIconText,
                                    color: focused ? '#7289DA' : '#BABBBF',
                                }}>PROFILE</Text>
                        </View>
                    )
                }}
            /> */}
            
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