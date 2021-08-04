import * as Location from 'expo-location';


/**
 * This is a method to checks and requests for the App to access FOREGROUND Location Permission.
 * 
 * @param {Function} onSuccess  A function that triggers when successful.
 * @returns 
 */
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

/**
 * This is a method to checks and requests for the App to access BACKGROUND Location Permission.
 * 
 * @param {Function} onSuccess  A function that triggers when successful.
 * @returns 
 */
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
