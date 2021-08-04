import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExerciseScreen from '../screens/Exercise/ExerciseScreen';
import MusicScreen from '../screens/Music/MusicScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SocialScreen from '../screens/Social/SocialScreen';


const {width, height} = Dimensions.get("window")

const Tab = createBottomTabNavigator();

/**
 * This is a functional component representing the bottom tabs of our App.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
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

            <Tab.Screen 
                name="SocialScreen" 
                component={SocialScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabIconContainer}>
                            <Image 
                                source={require('../assets/icons/TabSocial.png')}
                                resizeMode= 'contain'
                                style={{
                                    ...styles.tabIconImage,
                                    tintColor: focused ? '#7289DA' : '#BABBBF',
                                }}/>
                            <Text 
                                style = {{
                                    ...styles.tabIconText,
                                    color: focused ? '#7289DA' : '#BABBBF',
                                }}>SOCIAL</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen 
                name="ProfileScreen" 
                component={ProfileScreen}
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
            />
            
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabNavigationContainer:{
        // Container
        position: 'absolute',
        bottom: 0,
        height: height * 0.1,
        width: width,
        borderTopWidth: 0,
        backgroundColor: '#18191D',
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
});

export default AppTab;
