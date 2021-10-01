import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet,  Text,  View, Dimensions, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign'
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

import HistoryViewMap from './HistoryViewMap';
import ShareImage from '../../Share/ShareImage';

const {width, height} = Dimensions.get("window")

/**
 * This is a functional component representing the History View when tapping onto a record on the  
 * History Tab of Exercise page.
 * 
 * @author NTU CZ2006 Team Alpha
 */
const HistoryView = ({navigation, route}) => {
    const message = route.params.message        //message
    const distance = route.params.distance;     //Total Distance Ran
    const steps = route.params.steps;           //Total Steps
    const positions = route.params.positions;   //Array of Positions Travelled
    const duration = route.params.duration;     //Total Run Duration
    const time = route.params.time;             //Start Time of Run
    const day = route.params.day;               //Start Time of Run
    const date = route.params.date;             //Start Time of Run
    const mode = route.params.mode;             //Run mode

    /* [Convert miliseconds to time breakdown] */
    const displayDuration = moment.duration(duration);
    const [shareToggle, setShareToggle] = useState(false);
    const viewShotRef = useRef();

    /**
     * This is method to trigger social media sharing.
     */
    const share = async () => {

        const sharePic = await viewShotRef.current.capture();

        const shareOptions = {
            message: 'Check out my run route today and join me on Beat Stride!',
            url: sharePic,
        }
      
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(JSON.stringify(ShareResponse));
        } catch(error) {
            console.log('Error => ', error);
        }
    };

    /**
     * This is a render effect triggered on component mount.
     */
    useEffect(() => {
        setTimeout(() => setShareToggle(true), 50);
    }, []);

    return (
        <SafeAreaView style={styles.screen}>

            <View style={styles.contentContainer}>

                {/* Run Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{message}</Text>

                        {/* Share */}
                        <TouchableOpacity style={styles.shareIconContainer} onPress={share}>
                                <Icon name="sharealt" size={height * 0.04} color="#BABBBF"/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoContainer2}>
                        {/* Date */}
                        <View style={styles.dateContainer}>
                            <View style={styles.dateTopContainer}>
                                <Text style={styles.dayText}>{day}</Text>
                                <Text style={styles.dateText}>, {time}</Text>
                            </View>
                            
                            <Text style={styles.dateText}>{date}</Text>
                        </View>

                        {/* Mode */}
                        <View style={styles.modeContainer}>
                            <Text style={styles.modeText}>{mode}</Text>
                        </View>
                    </View>
                </View>

                {/* Distance */}
                <View style={styles.distanceContainer}>
                    <Text numberOfLines={1} style={styles.text}>{(distance/1000).toFixed(2)}</Text>
                    <Text style={styles.subtext}>Total Distance (km)</Text>
                </View>

                <View style={styles.secondaryDataContainer}>
                    {/* Time */}
                    <View style={styles.timeContainer}>
                        <Text numberOfLines={1} style={styles.text}>
                            {displayDuration.hours() < 10 ? `0${displayDuration.hours()}` : displayDuration.hours()}
                            :
                            {displayDuration.minutes() < 10 ? `0${displayDuration.minutes()}` : displayDuration.minutes()}
                            :
                            {displayDuration.seconds() < 10 ? `0${displayDuration.seconds()}` : displayDuration.seconds()}
                        </Text>
                        <Text style={styles.subtext}>Duration</Text>
                    </View>
                    {/* Steps */}
                    <View style={styles.stepsContainer}>
                        <Text numberOfLines={1} style={styles.text}>{steps}</Text>
                        <Text style={styles.subtext}>Steps</Text>
                    </View>
                </View>

            </View>


            {/* Map */}
            <View style={styles.mapContainer}>
                <HistoryViewMap
                    positions={positions}
                />
                
            </View>

            {/* Cross Button */}
            <TouchableOpacity style={styles.crossContainer} onPress={() => {navigation.goBack()}}>
                <Image
                    source={require('../../../assets/icons/close.png')}
                    resizeMode='contain'
                    style={styles.icon}
                />
            </TouchableOpacity>

            {/* Button Container */}
            <View style={styles.buttonContainer}>
                {/* Close Button */}
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <View style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Share Image */}
            {shareToggle ?
                <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1.0}} style={styles.shareImage}>
                    <ShareImage
                        distance = {distance}   
                        steps = {steps}           
                        positions = {positions}   
                        duration = {duration}     
                        time = {time}             
                        day = {day}               
                        date = {date}             
                        mode = {mode}
                    />
                </ViewShot> :
                <></>
            }
            

            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen:{
        width: width,
        height: height,
        backgroundColor: '#282b30',
    },
    contentContainer:{
        width: width,
        height: height * 0.4,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#282B30',
        zIndex: 1,
    },
    infoContainer:{
        width: width,
        height: height * 0.2,
        // backgroundColor: 'pink',
    },
    header:{
        width: width,
        height: height * 0.1,
        justifyContent: 'center',
        paddingLeft: width * 0.15,
        backgroundColor: '#1E2124',
    },
    headerText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    shareIconContainer:{
        height: height * 0.1,
        aspectRatio: 1,
        position: 'absolute',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow',
    },
    infoContainer2:{
        width: width * 0.9,
        height: height * 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        // backgroundColor: 'yellow',
    },
    dateContainer:{
        width: width * 0.5,
        height: height * 0.09,
        justifyContent: 'center',
        // backgroundColor: 'green',
    },
    dateTopContainer:{
        width: width * 0.5,
        height: height * 0.075 * 0.5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayText:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF'
    },
    dateText:{
        fontSize: 14,
        color: '#FFFFFF'
    },
    modeContainer:{
        width: width * 0.3,
        height: height * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#7289DA',
    },
    modeText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    distanceContainer:{
        width: width,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'purple',
    },
    secondaryDataContainer:{
        width: width,
        height: height * 0.1,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    timeContainer:{
        width: width * 0.5,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    stepsContainer:{
        width: width * 0.5,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'grey',
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subtext:{
        fontSize: 14,
        color: '#BABBBF',
    },
    mapContainer:{
        width: width,
        height: height * 0.65,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        
    }, 
    crossContainer:{
        position: 'absolute',
        width: width * 0.1,
        aspectRatio: 1,
        zIndex: 2,
        left: width * 0.025,
        top: ((height * 0.1) - (width * 0.1)) * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    icon:{
        height: width * 0.05,
        aspectRatio: 1,
        tintColor: '#BABBBF',
    },
    buttonContainer:{
        position: 'absolute',
        bottom: height * 0.95 * 0.02 ,
        alignSelf: 'center',
    },
    closeButton:{
        width: width * 0.3,
        height: height * 0.13 * 0.4,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7289DA',
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    shareImage: {
        width: width,
        height: width,
        backgroundColor:'#FFFFFF',
        position: 'absolute',
        zIndex: -1,
    },
})

export default HistoryView;
