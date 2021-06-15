import * as Location from 'expo-location'; 
import React from 'react';
import { Alert } from 'react-native';

// App FOREGROUND Location Permission - Check + Request 
export const forePermissionCheck = async(onSuccess) => {
    try {
        forePermissions = await Location.getForegroundPermissionsAsync()

        if (!forePermissions.granted){
        console.log('Foreground Permission Not Granted')
        forePermissionsrequest = await Location.requestForegroundPermissionsAsync()
            if(forePermissionsrequest.granted) {
                console.log('Foreground Permission Granted')
                return onSuccess();
            } else {
                //retry request alert
            }
        } else {
            console.log('Foreground Permission already Granted')
            return onSuccess();
        }
    } catch (error) {
        console.log(error)
        console.log('foreground error')
    }
}

// App BACKGROUND Location Permission - Check + Request 
export const backPermissionCheck = async(onSuccess) => {
    try {
        backPermissions = await Location.getBackgroundPermissionsAsync()

        if (!backPermissions.granted){
        console.log('Background Permission Not Granted')
        backPermissionsrequest = await Location.requestBackgroundPermissionsAsync()
            if(backPermissionsrequest.granted){
                console.log('Background Permission Granted')
                return onSuccess();
            } else {
                //retry request alert
            }
        } else {
            console.log('Background Permission already Granted')
            return onSuccess();
        }
    } catch (error) {
        console.log(error)
        console.log('background error')
    }
}