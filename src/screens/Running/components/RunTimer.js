import React, {useState, useEffect} from 'react';
import {  SafeAreaView,  ScrollView,  StyleSheet,  Text,  View, Dimensions} from 'react-native';
import moment from 'moment';
import TTS from 'react-native-tts';

const {width, height} = Dimensions.get("window")

const RunTimer = (props) => {
    const runStatus = props.runStatus;
    const setDuration = props.setDuration;
    const distance = props.distance;
    const km = props.km;
    const setKm = props.setKm;
    TTS.setDucking(true); //Supposedly suppress other sound sources. To be tested.

    const [time, setTime] = useState(0);
    const [tick, setTick] = useState();

    /* [Tick every 1000ms increase time by 1 second] */
    const ticking = () => {
        setTime( (prevTime) => prevTime + 1000 )
    }

    /* [Start timing] */
    const startTimer = () => {
        console.log("Timer Start")
        setTick( setInterval( ticking, 1000) )
    }

    /* [Stop timing] */
    const stopTimer = () => {
        console.log("Timer Stop")
        clearInterval(tick)
    }
    
    /* [Run Status Render] 
    This render is triggered upon a change in app status */
    useEffect(() => {
        if (runStatus == 2){
            startTimer()
        }
        if (runStatus == 3){
            stopTimer()
            console.log("time====================")
            console.log(time)
        }
        if (runStatus == 4 || runStatus == 5){
            stopTimer()
            setDuration(time)
        }
    },[runStatus])

    //Additional (Audio Guidance) To detect changes in distance in terms of km and make announcements
    useEffect(() => {
        if (Math.floor(distance/1000) > km) {
            const distInKm = Math.floor(distance/1000);
            const hour = Math.floor(time / 3600000);
            const min = Math.floor((time % 3600000)/ 60000);
            const sec = Math.floor((time % 60000)/1000); //To round off, 0.0000000001 type
            const avgTime = time / distInKm;
            const paceHour = Math.floor(avgTime / 3600000);
            const paceMin = Math.floor((avgTime % 3600000) / 60000);
            const paceSec = Math.floor((avgTime % 60000)/1000);
            let msg = `Total distance ${distInKm} kilometers, time now, `;
            if (hour !== 0) {
                msg += hour + (hour === 1 ? " hour" :  " hours") + " ";
            }
            if (min !== 0) {
                msg += min + (min === 1 ? " minute" : " minutes") + " and";
            }
            if (sec !== 0) {
                msg += sec + (sec === 1 ? " second" : " seconds") + " Average pace, ";
            }
            if (paceHour !== 0) {
                msg += paceHour + (paceHour === 1 ? " hour " : " hours ")
            }
            if (paceMin !== 0) {
                msg += paceMin + (paceMin === 1 ? " minute" : " minutes") + " and ";
            }
            if (paceSec !== 0) {
                msg += paceSec + (paceSec === 1 ? " second" : " seconds") + " per kilometer";
            }
            TTS.getInitStatus().then(()=> 
                TTS.speak(msg)
            );
            setKm(distInKm);
        }
    }, [distance, time])
    
    /* [Convert miliseconds to time breakdown] */
    const duration = moment.duration(time)

    return (
        <View style={styles.componentContainer}>
            <Text numberOfLines={1} style={styles.text}>{duration.hours()}:{duration.minutes()}:{duration.seconds()}</Text>
            <Text style={styles.subtext}>Duration</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    componentContainer:{
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
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
})

export default RunTimer;